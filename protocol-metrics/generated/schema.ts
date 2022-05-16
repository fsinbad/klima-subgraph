// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ProtocolMetric extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("klimaCirculatingSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set(
      "sKlimaCirculatingSupply",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set("totalSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("klimaPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("marketCap", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalValueLocked", Value.fromBigDecimal(BigDecimal.zero()));
    this.set(
      "treasuryCarbonCustodied",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set("treasuryMarketValue", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("nextEpochRebase", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("nextDistributedKlima", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("treasuryCarbon", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("currentAKR", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("runwayCurrent", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("holders", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ProtocolMetric entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ProtocolMetric must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ProtocolMetric", id.toString(), this);
    }
  }

  static load(id: string): ProtocolMetric | null {
    return changetype<ProtocolMetric | null>(store.get("ProtocolMetric", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get klimaCirculatingSupply(): BigDecimal {
    let value = this.get("klimaCirculatingSupply");
    return value!.toBigDecimal();
  }

  set klimaCirculatingSupply(value: BigDecimal) {
    this.set("klimaCirculatingSupply", Value.fromBigDecimal(value));
  }

  get sKlimaCirculatingSupply(): BigDecimal {
    let value = this.get("sKlimaCirculatingSupply");
    return value!.toBigDecimal();
  }

  set sKlimaCirculatingSupply(value: BigDecimal) {
    this.set("sKlimaCirculatingSupply", Value.fromBigDecimal(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get klimaPrice(): BigDecimal {
    let value = this.get("klimaPrice");
    return value!.toBigDecimal();
  }

  set klimaPrice(value: BigDecimal) {
    this.set("klimaPrice", Value.fromBigDecimal(value));
  }

  get marketCap(): BigDecimal {
    let value = this.get("marketCap");
    return value!.toBigDecimal();
  }

  set marketCap(value: BigDecimal) {
    this.set("marketCap", Value.fromBigDecimal(value));
  }

  get totalValueLocked(): BigDecimal {
    let value = this.get("totalValueLocked");
    return value!.toBigDecimal();
  }

  set totalValueLocked(value: BigDecimal) {
    this.set("totalValueLocked", Value.fromBigDecimal(value));
  }

  get assets(): Array<string> | null {
    let value = this.get("assets");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set assets(value: Array<string> | null) {
    if (!value) {
      this.unset("assets");
    } else {
      this.set("assets", Value.fromStringArray(<Array<string>>value));
    }
  }

  get treasuryCarbonCustodied(): BigDecimal {
    let value = this.get("treasuryCarbonCustodied");
    return value!.toBigDecimal();
  }

  set treasuryCarbonCustodied(value: BigDecimal) {
    this.set("treasuryCarbonCustodied", Value.fromBigDecimal(value));
  }

  get treasuryMarketValue(): BigDecimal {
    let value = this.get("treasuryMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryMarketValue(value: BigDecimal) {
    this.set("treasuryMarketValue", Value.fromBigDecimal(value));
  }

  get nextEpochRebase(): BigDecimal {
    let value = this.get("nextEpochRebase");
    return value!.toBigDecimal();
  }

  set nextEpochRebase(value: BigDecimal) {
    this.set("nextEpochRebase", Value.fromBigDecimal(value));
  }

  get nextDistributedKlima(): BigDecimal {
    let value = this.get("nextDistributedKlima");
    return value!.toBigDecimal();
  }

  set nextDistributedKlima(value: BigDecimal) {
    this.set("nextDistributedKlima", Value.fromBigDecimal(value));
  }

  get treasuryCarbon(): BigDecimal {
    let value = this.get("treasuryCarbon");
    return value!.toBigDecimal();
  }

  set treasuryCarbon(value: BigDecimal) {
    this.set("treasuryCarbon", Value.fromBigDecimal(value));
  }

  get currentAKR(): BigDecimal {
    let value = this.get("currentAKR");
    return value!.toBigDecimal();
  }

  set currentAKR(value: BigDecimal) {
    this.set("currentAKR", Value.fromBigDecimal(value));
  }

  get runwayCurrent(): BigDecimal {
    let value = this.get("runwayCurrent");
    return value!.toBigDecimal();
  }

  set runwayCurrent(value: BigDecimal) {
    this.set("runwayCurrent", Value.fromBigDecimal(value));
  }

  get holders(): BigInt {
    let value = this.get("holders");
    return value!.toBigInt();
  }

  set holders(value: BigInt) {
    this.set("holders", Value.fromBigInt(value));
  }
}

export class TreasuryAsset extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("token", Value.fromString(""));
    this.set("tokenBalance", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("carbonBalance", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("carbonCustodied", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("marketValue", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("POL", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TreasuryAsset entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TreasuryAsset must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TreasuryAsset", id.toString(), this);
    }
  }

  static load(id: string): TreasuryAsset | null {
    return changetype<TreasuryAsset | null>(store.get("TreasuryAsset", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get tokenBalance(): BigDecimal {
    let value = this.get("tokenBalance");
    return value!.toBigDecimal();
  }

  set tokenBalance(value: BigDecimal) {
    this.set("tokenBalance", Value.fromBigDecimal(value));
  }

  get carbonBalance(): BigDecimal {
    let value = this.get("carbonBalance");
    return value!.toBigDecimal();
  }

  set carbonBalance(value: BigDecimal) {
    this.set("carbonBalance", Value.fromBigDecimal(value));
  }

  get carbonCustodied(): BigDecimal {
    let value = this.get("carbonCustodied");
    return value!.toBigDecimal();
  }

  set carbonCustodied(value: BigDecimal) {
    this.set("carbonCustodied", Value.fromBigDecimal(value));
  }

  get marketValue(): BigDecimal {
    let value = this.get("marketValue");
    return value!.toBigDecimal();
  }

  set marketValue(value: BigDecimal) {
    this.set("marketValue", Value.fromBigDecimal(value));
  }

  get POL(): BigDecimal {
    let value = this.get("POL");
    return value!.toBigDecimal();
  }

  set POL(value: BigDecimal) {
    this.set("POL", Value.fromBigDecimal(value));
  }
}

export class Aux extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("value", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Aux entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Aux must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Aux", id.toString(), this);
    }
  }

  static load(id: string): Aux | null {
    return changetype<Aux | null>(store.get("Aux", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("blockNumber", Value.fromBigInt(BigInt.zero()));
    this.set("from", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Transaction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Transaction", id.toString(), this);
    }
  }

  static load(id: string): Transaction | null {
    return changetype<Transaction | null>(store.get("Transaction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value!.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes | null {
    let value = this.get("to");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set to(value: Bytes | null) {
    if (!value) {
      this.unset("to");
    } else {
      this.set("to", Value.fromBytes(<Bytes>value));
    }
  }
}