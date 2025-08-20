open Table
open Enums.EntityType
type id = string

type internalEntity = Internal.entity
module type Entity = {
  type t
  let name: Enums.EntityType.t
  let schema: S.t<t>
  let rowsSchema: S.t<array<t>>
  let table: Table.table
  let entityHistory: EntityHistory.t<t>
}
external entityModToInternal: module(Entity with type t = 'a) => Internal.entityConfig = "%identity"
external entityModsToInternal: array<module(Entity)> => array<Internal.entityConfig> = "%identity"
external entitiesToInternal: array<'a> => array<Internal.entity> = "%identity"

@get
external getEntityId: internalEntity => string = "id"

exception UnexpectedIdNotDefinedOnEntity
let getEntityIdUnsafe = (entity: 'entity): id =>
  switch Utils.magic(entity)["id"] {
  | Some(id) => id
  | None =>
    UnexpectedIdNotDefinedOnEntity->ErrorHandling.mkLogAndRaise(
      ~msg="Property 'id' does not exist on expected entity object",
    )
  }

//shorthand for punning
let isPrimaryKey = true
let isNullable = true
let isArray = true
let isIndex = true

@genType
type whereOperations<'entity, 'fieldType> = {
  eq: 'fieldType => promise<array<'entity>>,
  gt: 'fieldType => promise<array<'entity>>
}

module Revenue = {
  let name = Revenue
  @genType
  type t = {
    amount: float,
    chainId: bigint,
    currency: string,
    date: string,
    dateTimestamp: Js.Date.t,
    id: id,
  }

  let schema = S.object((s): t => {
    amount: s.field("amount", S.float),
    chainId: s.field("chainId", BigInt.schema),
    currency: s.field("currency", S.string),
    date: s.field("date", S.string),
    dateTimestamp: s.field("dateTimestamp", Utils.Schema.dbDate),
    id: s.field("id", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "amount", 
      DoublePrecision,
      ~fieldSchema=S.float,
      
      
      
      
      
      ),
      mkField(
      "chainId", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "currency", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "date", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "dateTimestamp", 
      Timestamp,
      ~fieldSchema=Utils.Schema.dbDate,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

module RevenueTransaction = {
  let name = RevenueTransaction
  @genType
  type t = {
    amount: float,
    block: bigint,
    hash: string,
    id: id,
    revenue_id: id,
    timestamp: bigint,
  }

  let schema = S.object((s): t => {
    amount: s.field("amount", S.float),
    block: s.field("block", BigInt.schema),
    hash: s.field("hash", S.string),
    id: s.field("id", S.string),
    revenue_id: s.field("revenue_id", S.string),
    timestamp: s.field("timestamp", BigInt.schema),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "amount", 
      DoublePrecision,
      ~fieldSchema=S.float,
      
      
      
      
      
      ),
      mkField(
      "block", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "hash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "revenue", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Revenue",
      ),
      mkField(
      "timestamp", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

module User = {
  let name = User
  @genType
  type t = {
    address: string,
    chainId: bigint,
    id: id,
    isOnlyAirdropClaimer: bool,
  }

  let schema = S.object((s): t => {
    address: s.field("address", S.string),
    chainId: s.field("chainId", BigInt.schema),
    id: s.field("id", S.string),
    isOnlyAirdropClaimer: s.field("isOnlyAirdropClaimer", S.bool),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "address", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "chainId", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "isOnlyAirdropClaimer", 
      Boolean,
      ~fieldSchema=S.bool,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

module UserTransaction = {
  let name = UserTransaction
  @genType
  type t = {
    block: bigint,
    fee: float,
    hash: string,
    id: id,
    isAirdropClaim: bool,
    timestamp: bigint,
    user_id: id,
  }

  let schema = S.object((s): t => {
    block: s.field("block", BigInt.schema),
    fee: s.field("fee", S.float),
    hash: s.field("hash", S.string),
    id: s.field("id", S.string),
    isAirdropClaim: s.field("isAirdropClaim", S.bool),
    timestamp: s.field("timestamp", BigInt.schema),
    user_id: s.field("user_id", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "block", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "fee", 
      DoublePrecision,
      ~fieldSchema=S.float,
      
      
      
      
      
      ),
      mkField(
      "hash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "isAirdropClaim", 
      Boolean,
      ~fieldSchema=S.bool,
      
      
      
      
      
      ),
      mkField(
      "timestamp", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "user", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="User",
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

let userEntities = [
  module(Revenue),
  module(RevenueTransaction),
  module(User),
  module(UserTransaction),
]->entityModsToInternal

let allEntities =
  userEntities->Js.Array2.concat(
    [module(TablesStatic.DynamicContractRegistry)]->entityModsToInternal,
  )

let byName =
  allEntities
  ->Js.Array2.map(entityConfig => {
    (entityConfig.name, entityConfig)
  })
  ->Js.Dict.fromArray
