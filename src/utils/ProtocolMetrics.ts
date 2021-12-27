import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { KlimaERC20V1 } from '../../generated/KlimaStakingV1/KlimaERC20V1';
import { sKlimaERC20V1 } from '../../generated/KlimaStakingV1/sKlimaERC20V1';
//import { sOlympusERC20V2 } from '../../generated/OlympusStakingV1/sOlympusERC20V2';
import { CirculatingSupply } from '../../generated/KlimaStakingV1/CirculatingSupply';
import { ERC20 } from '../../generated/KlimaStakingV1/ERC20';
import { UniswapV2Pair } from '../../generated/KlimaStakingV1/UniswapV2Pair';
//import { MasterChef } from '../../generated/OlympusStakingV1/MasterChef';
//import { OlympusStakingV2 } from '../../generated/OlympusStakingV2/OlympusStakingV2';
//import { OlympusStakingV1 } from '../../generated/OlympusStakingV1/OlympusStakingV1';
//import { ConvexAllocator } from '../../generated/OlympusStakingV1/ConvexAllocator';

import { ProtocolMetric, Transaction } from '../../generated/schema'
import * as constants from './Constants';
import { dayFromTimestamp } from './Dates';
import { toDecimal } from './Decimals';
import { getKLIMAUSDRate, getDiscountedPairCO2, getKlimaPairUSD } from './Price';
import { getHolderAux } from './Aux';
//import { updateBondDiscounts } from './BondDiscounts';

export function loadOrCreateProtocolMetric(timestamp: BigInt): ProtocolMetric {
    let dayTimestamp = dayFromTimestamp(timestamp);

    let protocolMetric = ProtocolMetric.load(dayTimestamp)
    if (protocolMetric == null) {
        protocolMetric = new ProtocolMetric(dayTimestamp)
        protocolMetric.timestamp = timestamp
        protocolMetric.klimaCirculatingSupply = BigDecimal.fromString("0")
        protocolMetric.sKlimaCirculatingSupply = BigDecimal.fromString("0")
        protocolMetric.totalSupply = BigDecimal.fromString("0")
        protocolMetric.klimaPrice = BigDecimal.fromString("0")
        protocolMetric.marketCap = BigDecimal.fromString("0")
        protocolMetric.totalValueLocked = BigDecimal.fromString("0")
        protocolMetric.treasuryRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryMarketValue = BigDecimal.fromString("0")
        protocolMetric.nextEpochRebase = BigDecimal.fromString("0")
        protocolMetric.nextDistributedKlima = BigDecimal.fromString("0")
        protocolMetric.currentAPY = BigDecimal.fromString("0")
        protocolMetric.treasuryCarbonRFV = BigDecimal.fromString("0")
        protocolMetric.treasuryKlimaBCTRFV = BigDecimal.fromString("0")
        protocolMetric.treasuryKlimaBCTPOL = BigDecimal.fromString("0")
        protocolMetric.treasuryBCTUSDCPOL = BigDecimal.fromString("0")
        protocolMetric.holders = BigInt.fromI32(0)

        protocolMetric.save()
    }
    return protocolMetric as ProtocolMetric
}


function getTotalSupply(): BigDecimal {
    let klima_contract = KlimaERC20V1.bind(Address.fromString(constants.KLIMA_ERC20_V1_CONTRACT))
    let total_supply = toDecimal(klima_contract.totalSupply(), 9)
    log.debug("Total Supply {}", [total_supply.toString()])
    return total_supply
}

function getCriculatingSupply(transaction: Transaction, total_supply: BigDecimal): BigDecimal {
    let circ_supply = BigDecimal.fromString("0")
    if (transaction.blockNumber.gt(BigInt.fromString(constants.CIRCULATING_SUPPLY_CONTRACT_BLOCK))) {
        let circulatingsupply_contract = CirculatingSupply.bind(Address.fromString(constants.CIRCULATING_SUPPLY_CONTRACT))
        circ_supply = toDecimal(circulatingsupply_contract.KLIMACirculatingSupply(), 9)
    }
    else {
        circ_supply = total_supply;
    }
    log.debug("Circulating Supply {}", [total_supply.toString()])
    return circ_supply
}

function getSklimaSupply(transaction: Transaction): BigDecimal {
    let sklima_supply = BigDecimal.fromString("0")

    let sklima_contract_v1 = sKlimaERC20V1.bind(Address.fromString(constants.SKLIMA_ERC20_V1_CONTRACT))
    sklima_supply = toDecimal(sklima_contract_v1.circulatingSupply(), 9)

    log.debug("sKLIMA Supply {}", [sklima_supply.toString()])
    return sklima_supply
}

function getMV_RFV(transaction: Transaction): BigDecimal[] {
    let bctERC20 = ERC20.bind(Address.fromString(constants.BCT_ERC20_CONTRACT))

    let klimabctPair = UniswapV2Pair.bind(Address.fromString(constants.KLIMA_BCT_PAIR))
    let bctusdcPair = UniswapV2Pair.bind(Address.fromString(constants.BCT_USDC_PAIR))

    let treasury_address = constants.TREASURY_ADDRESS;

    // Single Assets

    let bctBalance = bctERC20.balanceOf(Address.fromString(treasury_address))

    // LP Assets

    // KLIMA-BCT
    let klimabctSushiBalance = klimabctPair.balanceOf(Address.fromString(treasury_address))
    let klimabctTotalLP = toDecimal(klimabctPair.totalSupply(), 18)
    let klimabctPOL = toDecimal(klimabctSushiBalance, 18).div(klimabctTotalLP).times(BigDecimal.fromString("100"))
    //let klimabct_value = getKlimaPairUSD(klimabctSushiBalance, constants.KLIMA_BCT_PAIR)
    let klimabct_rfv = getDiscountedPairCO2(klimabctSushiBalance, constants.KLIMA_BCT_PAIR)

    // Total all assets

    let co2Value = bctBalance
    let co2ValueDecimal = toDecimal(co2Value, 18)

    //let lpValue = ohmdai_value.plus(ohmfrax_value).plus(ohmlusd_value).plus(ohmeth_value)
    let rfvLpValue = klimabct_rfv

    let mv = co2ValueDecimal
    let rfv = co2ValueDecimal.plus(rfvLpValue)

    //log.debug("Treasury Market Value {}", [mv.toString()])
    log.debug("Treasury RFV {}", [rfv.toString()])
    log.debug("Treasury BCT value {}", [toDecimal(bctBalance, 18).toString()])
    log.debug("Treasury KLIMA-BCT RFV {}", [klimabct_rfv.toString()])

    return [
        mv,
        rfv,
        co2ValueDecimal,    // Total Carbon RFV
        klimabct_rfv,       // KLIMA-BCT RFV
        klimabctPOL         // KLIMA-BCT POL
    ]
}

function getNextOHMRebase(transaction: Transaction): BigDecimal {
    let next_distribution = BigDecimal.fromString("0")

    let staking_contract_v1 = OlympusStakingV1.bind(Address.fromString(STAKING_CONTRACT_V1))
    let response = staking_contract_v1.try_ohmToDistributeNextEpoch()
    if (response.reverted == false) {
        next_distribution = toDecimal(response.value, 9)
        log.debug("next_distribution v1 {}", [next_distribution.toString()])
    }
    else {
        log.debug("reverted staking_contract_v1", [])
    }

    if (transaction.blockNumber.gt(BigInt.fromString(STAKING_CONTRACT_V2_BLOCK))) {
        let staking_contract_v2 = OlympusStakingV2.bind(Address.fromString(STAKING_CONTRACT_V2))
        let distribution_v2 = toDecimal(staking_contract_v2.epoch().value3, 9)
        log.debug("next_distribution v2 {}", [distribution_v2.toString()])
        next_distribution = next_distribution.plus(distribution_v2)
    }

    log.debug("next_distribution total {}", [next_distribution.toString()])

    return next_distribution
}

function getAPY_Rebase(sOHM: BigDecimal, distributedOHM: BigDecimal): BigDecimal[] {
    let nextEpochRebase = distributedOHM.div(sOHM).times(BigDecimal.fromString("100"));

    let nextEpochRebase_number = Number.parseFloat(nextEpochRebase.toString())
    let currentAPY = Math.pow(((nextEpochRebase_number / 100) + 1), (365 * 3) - 1) * 100

    let currentAPYdecimal = BigDecimal.fromString(currentAPY.toString())

    log.debug("next_rebase {}", [nextEpochRebase.toString()])
    log.debug("current_apy total {}", [currentAPYdecimal.toString()])

    return [currentAPYdecimal, nextEpochRebase]
}

function getRunway(sOHM: BigDecimal, rfv: BigDecimal, rebase: BigDecimal): BigDecimal[] {
    let runway2dot5k = BigDecimal.fromString("0")
    let runway5k = BigDecimal.fromString("0")
    let runway7dot5k = BigDecimal.fromString("0")
    let runway10k = BigDecimal.fromString("0")
    let runway20k = BigDecimal.fromString("0")
    let runway50k = BigDecimal.fromString("0")
    let runway70k = BigDecimal.fromString("0")
    let runway100k = BigDecimal.fromString("0")
    let runwayCurrent = BigDecimal.fromString("0")

    if (sOHM.gt(BigDecimal.fromString("0")) && rfv.gt(BigDecimal.fromString("0")) && rebase.gt(BigDecimal.fromString("0"))) {
        let treasury_runway = Number.parseFloat(rfv.div(sOHM).toString())

        let runway2dot5k_num = (Math.log(treasury_runway) / Math.log(1 + 0.0029438)) / 3;
        let runway5k_num = (Math.log(treasury_runway) / Math.log(1 + 0.003579)) / 3;
        let runway7dot5k_num = (Math.log(treasury_runway) / Math.log(1 + 0.0039507)) / 3;
        let runway10k_num = (Math.log(treasury_runway) / Math.log(1 + 0.00421449)) / 3;
        let runway20k_num = (Math.log(treasury_runway) / Math.log(1 + 0.00485037)) / 3;
        let runway50k_num = (Math.log(treasury_runway) / Math.log(1 + 0.00569158)) / 3;
        let runway70k_num = (Math.log(treasury_runway) / Math.log(1 + 0.00600065)) / 3;
        let runway100k_num = (Math.log(treasury_runway) / Math.log(1 + 0.00632839)) / 3;
        let nextEpochRebase_number = Number.parseFloat(rebase.toString()) / 100
        let runwayCurrent_num = (Math.log(treasury_runway) / Math.log(1 + nextEpochRebase_number)) / 3;

        runway2dot5k = BigDecimal.fromString(runway2dot5k_num.toString())
        runway5k = BigDecimal.fromString(runway5k_num.toString())
        runway7dot5k = BigDecimal.fromString(runway7dot5k_num.toString())
        runway10k = BigDecimal.fromString(runway10k_num.toString())
        runway20k = BigDecimal.fromString(runway20k_num.toString())
        runway50k = BigDecimal.fromString(runway50k_num.toString())
        runway70k = BigDecimal.fromString(runway70k_num.toString())
        runway100k = BigDecimal.fromString(runway100k_num.toString())
        runwayCurrent = BigDecimal.fromString(runwayCurrent_num.toString())
    }

    return [runway2dot5k, runway5k, runway7dot5k, runway10k, runway20k, runway50k, runway70k, runway100k, runwayCurrent]
}


export function updateProtocolMetrics(transaction: Transaction): void {
    let pm = loadOrCreateProtocolMetric(transaction.timestamp);

    //Total Supply
    pm.totalSupply = getTotalSupply()

    //Circ Supply
    pm.klimaCirculatingSupply = getCriculatingSupply(transaction, pm.totalSupply)

    //sKlima Supply
    pm.sKlimaCirculatingSupply = getSklimaSupply(transaction)

    //KLIMA Price
    pm.klimaPrice = getKLIMAUSDRate()

    //KLIMA Market Cap
    pm.marketCap = pm.klimaCirculatingSupply.times(pm.klimaPrice)

    //Total Value Locked
    pm.totalValueLocked = pm.sKlimaCirculatingSupply.times(pm.klimaPrice)

    //Treasury RFV and MV
    let mv_rfv = getMV_RFV(transaction)
    pm.treasuryMarketValue = mv_rfv[0]
    pm.treasuryRiskFreeValue = mv_rfv[1]
    pm.treasuryCarbonRFV = mv_rfv[2]
    pm.treasuryKlimaBCTRFV = mv_rfv[3]
    pm.treasuryKlimaBCTPOL = mv_rfv[4]
    /*
    // Rebase rewards, APY, rebase
    pm.nextDistributedOhm = getNextOHMRebase(transaction)
    let apy_rebase = getAPY_Rebase(pm.sOhmCirculatingSupply, pm.nextDistributedOhm)
    pm.currentAPY = apy_rebase[0]
    pm.nextEpochRebase = apy_rebase[1]

    //Runway
    let runways = getRunway(pm.sOhmCirculatingSupply, pm.treasuryRiskFreeValue, pm.nextEpochRebase)
    pm.runway2dot5k = runways[0]
    pm.runway5k = runways[1]
    pm.runway7dot5k = runways[2]
    pm.runway10k = runways[3]
    pm.runway20k = runways[4]
    pm.runway50k = runways[5]
    pm.runway70k = runways[6]
    pm.runway100k = runways[7]
    pm.runwayCurrent = runways[8]
    */

    //Holders
    pm.holders = getHolderAux().value

    pm.save()

    //updateBondDiscounts(transaction)
}
