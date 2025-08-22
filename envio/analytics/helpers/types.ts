import type { Entity } from "../bindings";

export namespace Params {
  export type User = {
    address: string;
    entity?: Entity.User;
    isAirdropClaim: boolean;
    tx?: Entity.UserTransaction;
  };

  export type Revenue = {
    entity?: Entity.Revenue;
  };
}
