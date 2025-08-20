/***** TAKE NOTE ******
This is a hack to get genType to work!

In order for genType to produce recursive types, it needs to be at the 
root module of a file. If it's defined in a nested module it does not 
work. So all the MockDb types and internal functions are defined in TestHelpers_MockDb
and only public functions are recreated and exported from this module.

the following module:
```rescript
module MyModule = {
  @genType
  type rec a = {fieldB: b}
  @genType and b = {fieldA: a}
}
```

produces the following in ts:
```ts
// tslint:disable-next-line:interface-over-type-literal
export type MyModule_a = { readonly fieldB: b };

// tslint:disable-next-line:interface-over-type-literal
export type MyModule_b = { readonly fieldA: MyModule_a };
```

fieldB references type b which doesn't exist because it's defined
as MyModule_b
*/

module MockDb = {
  @genType
  let createMockDb = TestHelpers_MockDb.createMockDb
}

@genType
module Addresses = {
  include TestHelpers_MockAddresses
}

module EventFunctions = {
  //Note these are made into a record to make operate in the same way
  //for Res, JS and TS.

  /**
  The arguements that get passed to a "processEvent" helper function
  */
  @genType
  type eventProcessorArgs<'event> = {
    event: 'event,
    mockDb: TestHelpers_MockDb.t,
    @deprecated("Set the chainId for the event instead")
    chainId?: int,
  }

  @genType
  type eventProcessor<'event> = eventProcessorArgs<'event> => promise<TestHelpers_MockDb.t>

  /**
  A function composer to help create individual processEvent functions
  */
  let makeEventProcessor = (~register) => args => {
    let {event, mockDb, ?chainId} =
      args->(Utils.magic: eventProcessorArgs<'event> => eventProcessorArgs<Internal.event>)

    // Have the line here, just in case the function is called with
    // a manually created event. We don't want to break the existing tests here.
    let _ =
      TestHelpers_MockDb.mockEventRegisters->Utils.WeakMap.set(event, register)
    TestHelpers_MockDb.makeProcessEvents(mockDb, ~chainId=?chainId)([event->(Utils.magic: Internal.event => Types.eventLog<unknown>)])
  }

  module MockBlock = {
    @genType
    type t = {
      hash?: string,
      number?: int,
      timestamp?: int,
    }

    let toBlock = (_mock: t) => {
      hash: _mock.hash->Belt.Option.getWithDefault("foo"),
      number: _mock.number->Belt.Option.getWithDefault(0),
      timestamp: _mock.timestamp->Belt.Option.getWithDefault(0),
    }->(Utils.magic: Types.AggregatedBlock.t => Internal.eventBlock)
  }

  module MockTransaction = {
    @genType
    type t = {
      from?: option<Address.t>,
      hash?: string,
      to?: option<Address.t>,
      transactionIndex?: int,
      value?: bigint,
    }

    let toTransaction = (_mock: t) => {
      from: _mock.from->Belt.Option.getWithDefault(None),
      hash: _mock.hash->Belt.Option.getWithDefault("foo"),
      to: _mock.to->Belt.Option.getWithDefault(None),
      transactionIndex: _mock.transactionIndex->Belt.Option.getWithDefault(0),
      value: _mock.value->Belt.Option.getWithDefault(0n),
    }->(Utils.magic: Types.AggregatedTransaction.t => Internal.eventTransaction)
  }

  @genType
  type mockEventData = {
    chainId?: int,
    srcAddress?: Address.t,
    logIndex?: int,
    block?: MockBlock.t,
    transaction?: MockTransaction.t,
  }

  /**
  Applies optional paramters with defaults for all common eventLog field
  */
  let makeEventMocker = (
    ~params: Internal.eventParams,
    ~mockEventData: option<mockEventData>,
    ~register: unit => Internal.eventConfig,
  ): Internal.event => {
    let {?block, ?transaction, ?srcAddress, ?chainId, ?logIndex} =
      mockEventData->Belt.Option.getWithDefault({})
    let block = block->Belt.Option.getWithDefault({})->MockBlock.toBlock
    let transaction = transaction->Belt.Option.getWithDefault({})->MockTransaction.toTransaction
    let config = RegisterHandlers.getConfig()
    let event: Internal.event = {
      params,
      transaction,
      chainId: switch chainId {
      | Some(chainId) => chainId
      | None =>
        switch config.defaultChain {
        | Some(chainConfig) => chainConfig.chain->ChainMap.Chain.toChainId
        | None =>
          Js.Exn.raiseError(
            "No default chain Id found, please add at least 1 chain to your config.yaml",
          )
        }
      },
      block,
      srcAddress: srcAddress->Belt.Option.getWithDefault(Addresses.defaultAddress),
      logIndex: logIndex->Belt.Option.getWithDefault(0),
    }
    // Since currently it's not possible to figure out the event config from the event
    // we store a reference to the register function by event in a weak map
    let _ = TestHelpers_MockDb.mockEventRegisters->Utils.WeakMap.set(event, register)
    event
  }
}


module SablierFlow_v1_0 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_0.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierFlow_v1_0.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_0.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.Transfer.event)
    }
  }

  module AdjustFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.AdjustFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.AdjustFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("totalDebt")
      totalDebt?: bigint,
      @as("oldRatePerSecond")
      oldRatePerSecond?: bigint,
      @as("newRatePerSecond")
      newRatePerSecond?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?totalDebt,
        ?oldRatePerSecond,
        ?newRatePerSecond,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       totalDebt: totalDebt->Belt.Option.getWithDefault(0n),
       oldRatePerSecond: oldRatePerSecond->Belt.Option.getWithDefault(0n),
       newRatePerSecond: newRatePerSecond->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_0.AdjustFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.AdjustFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.AdjustFlowStream.event)
    }
  }

  module CreateFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.CreateFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.CreateFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("ratePerSecond")
      ratePerSecond?: bigint,
      @as("token")
      token?: Address.t,
      @as("transferable")
      transferable?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?ratePerSecond,
        ?token,
        ?transferable,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       ratePerSecond: ratePerSecond->Belt.Option.getWithDefault(0n),
       token: token->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       transferable: transferable->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierFlow_v1_0.CreateFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.CreateFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.CreateFlowStream.event)
    }
  }

  module DepositFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.DepositFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.DepositFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("funder")
      funder?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?funder,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       funder: funder->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_0.DepositFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.DepositFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.DepositFlowStream.event)
    }
  }

  module PauseFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.PauseFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.PauseFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("totalDebt")
      totalDebt?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?totalDebt,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       totalDebt: totalDebt->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_0.PauseFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.PauseFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.PauseFlowStream.event)
    }
  }

  module RefundFromFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.RefundFromFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.RefundFromFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_0.RefundFromFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.RefundFromFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.RefundFromFlowStream.event)
    }
  }

  module RestartFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.RestartFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.RestartFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("ratePerSecond")
      ratePerSecond?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?ratePerSecond,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       ratePerSecond: ratePerSecond->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_0.RestartFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.RestartFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.RestartFlowStream.event)
    }
  }

  module VoidFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.VoidFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.VoidFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("caller")
      caller?: Address.t,
      @as("newTotalDebt")
      newTotalDebt?: bigint,
      @as("writtenOffDebt")
      writtenOffDebt?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?caller,
        ?newTotalDebt,
        ?writtenOffDebt,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newTotalDebt: newTotalDebt->Belt.Option.getWithDefault(0n),
       writtenOffDebt: writtenOffDebt->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_0.VoidFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.VoidFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.VoidFlowStream.event)
    }
  }

  module WithdrawFromFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_0.WithdrawFromFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_0.WithdrawFromFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("token")
      token?: Address.t,
      @as("caller")
      caller?: Address.t,
      @as("withdrawAmount")
      withdrawAmount?: bigint,
      @as("protocolFeeAmount")
      protocolFeeAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?token,
        ?caller,
        ?withdrawAmount,
        ?protocolFeeAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       token: token->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       withdrawAmount: withdrawAmount->Belt.Option.getWithDefault(0n),
       protocolFeeAmount: protocolFeeAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_0.WithdrawFromFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_0.WithdrawFromFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_0.WithdrawFromFlowStream.event)
    }
  }

}


module SablierFlow_v1_1 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_1.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierFlow_v1_1.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_1.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.Transfer.event)
    }
  }

  module AdjustFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.AdjustFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.AdjustFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("totalDebt")
      totalDebt?: bigint,
      @as("oldRatePerSecond")
      oldRatePerSecond?: bigint,
      @as("newRatePerSecond")
      newRatePerSecond?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?totalDebt,
        ?oldRatePerSecond,
        ?newRatePerSecond,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       totalDebt: totalDebt->Belt.Option.getWithDefault(0n),
       oldRatePerSecond: oldRatePerSecond->Belt.Option.getWithDefault(0n),
       newRatePerSecond: newRatePerSecond->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_1.AdjustFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.AdjustFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.AdjustFlowStream.event)
    }
  }

  module CreateFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.CreateFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.CreateFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("ratePerSecond")
      ratePerSecond?: bigint,
      @as("token")
      token?: Address.t,
      @as("transferable")
      transferable?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?ratePerSecond,
        ?token,
        ?transferable,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       ratePerSecond: ratePerSecond->Belt.Option.getWithDefault(0n),
       token: token->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       transferable: transferable->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierFlow_v1_1.CreateFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.CreateFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.CreateFlowStream.event)
    }
  }

  module DepositFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.DepositFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.DepositFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("funder")
      funder?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?funder,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       funder: funder->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_1.DepositFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.DepositFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.DepositFlowStream.event)
    }
  }

  module PauseFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.PauseFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.PauseFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("totalDebt")
      totalDebt?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?totalDebt,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       totalDebt: totalDebt->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_1.PauseFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.PauseFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.PauseFlowStream.event)
    }
  }

  module RefundFromFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.RefundFromFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.RefundFromFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_1.RefundFromFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.RefundFromFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.RefundFromFlowStream.event)
    }
  }

  module RestartFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.RestartFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.RestartFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("ratePerSecond")
      ratePerSecond?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?ratePerSecond,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       ratePerSecond: ratePerSecond->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_1.RestartFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.RestartFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.RestartFlowStream.event)
    }
  }

  module VoidFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.VoidFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.VoidFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("caller")
      caller?: Address.t,
      @as("newTotalDebt")
      newTotalDebt?: bigint,
      @as("writtenOffDebt")
      writtenOffDebt?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?caller,
        ?newTotalDebt,
        ?writtenOffDebt,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newTotalDebt: newTotalDebt->Belt.Option.getWithDefault(0n),
       writtenOffDebt: writtenOffDebt->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_1.VoidFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.VoidFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.VoidFlowStream.event)
    }
  }

  module WithdrawFromFlowStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierFlow_v1_1.WithdrawFromFlowStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierFlow_v1_1.WithdrawFromFlowStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("token")
      token?: Address.t,
      @as("caller")
      caller?: Address.t,
      @as("withdrawAmount")
      withdrawAmount?: bigint,
      @as("protocolFeeAmount")
      protocolFeeAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?token,
        ?caller,
        ?withdrawAmount,
        ?protocolFeeAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       token: token->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       withdrawAmount: withdrawAmount->Belt.Option.getWithDefault(0n),
       protocolFeeAmount: protocolFeeAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierFlow_v1_1.WithdrawFromFlowStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierFlow_v1_1.WithdrawFromFlowStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierFlow_v1_1.WithdrawFromFlowStream.event)
    }
  }

}


module SablierLockup_v2_0 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierLockup_v2_0.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierLockup_v2_0.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierLockup_v2_0.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierLockup_v2_0.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierLockup_v2_0.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierLockup_v2_0.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierLockup_v2_0.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierLockup_v2_0.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierLockup_v2_0.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierLockup_v2_0.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierLockup_v2_0.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierLockup_v2_0.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierLockup_v2_0.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierLockup_v2_0.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierLockup_v2_0.Transfer.event)
    }
  }

  module CancelLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierLockup_v2_0.CancelLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierLockup_v2_0.CancelLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("token")
      token?: Address.t,
      @as("senderAmount")
      senderAmount?: bigint,
      @as("recipientAmount")
      recipientAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?token,
        ?senderAmount,
        ?recipientAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       token: token->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       senderAmount: senderAmount->Belt.Option.getWithDefault(0n),
       recipientAmount: recipientAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierLockup_v2_0.CancelLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierLockup_v2_0.CancelLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierLockup_v2_0.CancelLockupStream.event)
    }
  }

  module CreateLockupDynamicStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierLockup_v2_0.CreateLockupDynamicStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierLockup_v2_0.CreateLockupDynamicStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("commonParams")
      commonParams?: (Address.t, Address.t, Address.t, (bigint, bigint), Address.t, bool, bool, (bigint, bigint), string, Address.t),
      @as("segments")
      segments?: array<(bigint, bigint, bigint)>,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?commonParams,
        ?segments,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       commonParams: commonParams->Belt.Option.getWithDefault((TestHelpers_MockAddresses.defaultAddress, TestHelpers_MockAddresses.defaultAddress, TestHelpers_MockAddresses.defaultAddress, (0n, 0n), TestHelpers_MockAddresses.defaultAddress, false, false, (0n, 0n), "foo", TestHelpers_MockAddresses.defaultAddress)),
       segments: segments->Belt.Option.getWithDefault([]),
      }
->(Utils.magic: Types.SablierLockup_v2_0.CreateLockupDynamicStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierLockup_v2_0.CreateLockupDynamicStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierLockup_v2_0.CreateLockupDynamicStream.event)
    }
  }

  module CreateLockupLinearStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierLockup_v2_0.CreateLockupLinearStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierLockup_v2_0.CreateLockupLinearStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("commonParams")
      commonParams?: (Address.t, Address.t, Address.t, (bigint, bigint), Address.t, bool, bool, (bigint, bigint), string, Address.t),
      @as("cliffTime")
      cliffTime?: bigint,
      @as("unlockAmounts")
      unlockAmounts?: (bigint, bigint),
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?commonParams,
        ?cliffTime,
        ?unlockAmounts,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       commonParams: commonParams->Belt.Option.getWithDefault((TestHelpers_MockAddresses.defaultAddress, TestHelpers_MockAddresses.defaultAddress, TestHelpers_MockAddresses.defaultAddress, (0n, 0n), TestHelpers_MockAddresses.defaultAddress, false, false, (0n, 0n), "foo", TestHelpers_MockAddresses.defaultAddress)),
       cliffTime: cliffTime->Belt.Option.getWithDefault(0n),
       unlockAmounts: unlockAmounts->Belt.Option.getWithDefault((0n, 0n)),
      }
->(Utils.magic: Types.SablierLockup_v2_0.CreateLockupLinearStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierLockup_v2_0.CreateLockupLinearStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierLockup_v2_0.CreateLockupLinearStream.event)
    }
  }

  module CreateLockupTranchedStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierLockup_v2_0.CreateLockupTranchedStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierLockup_v2_0.CreateLockupTranchedStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("commonParams")
      commonParams?: (Address.t, Address.t, Address.t, (bigint, bigint), Address.t, bool, bool, (bigint, bigint), string, Address.t),
      @as("tranches")
      tranches?: array<(bigint, bigint)>,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?commonParams,
        ?tranches,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       commonParams: commonParams->Belt.Option.getWithDefault((TestHelpers_MockAddresses.defaultAddress, TestHelpers_MockAddresses.defaultAddress, TestHelpers_MockAddresses.defaultAddress, (0n, 0n), TestHelpers_MockAddresses.defaultAddress, false, false, (0n, 0n), "foo", TestHelpers_MockAddresses.defaultAddress)),
       tranches: tranches->Belt.Option.getWithDefault([]),
      }
->(Utils.magic: Types.SablierLockup_v2_0.CreateLockupTranchedStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierLockup_v2_0.CreateLockupTranchedStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierLockup_v2_0.CreateLockupTranchedStream.event)
    }
  }

  module RenounceLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierLockup_v2_0.RenounceLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierLockup_v2_0.RenounceLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierLockup_v2_0.RenounceLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierLockup_v2_0.RenounceLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierLockup_v2_0.RenounceLockupStream.event)
    }
  }

  module WithdrawFromLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierLockup_v2_0.WithdrawFromLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierLockup_v2_0.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("token")
      token?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?token,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       token: token->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierLockup_v2_0.WithdrawFromLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierLockup_v2_0.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierLockup_v2_0.WithdrawFromLockupStream.event)
    }
  }

}


module SablierMerkleFactory_v1_3 = {
  module CreateMerkleInstant = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("merkleInstant")
      merkleInstant?: Address.t,
      @as("baseParams")
      baseParams?: (Address.t, bigint, Address.t, string, string, string, string),
      @as("aggregateAmount")
      aggregateAmount?: bigint,
      @as("recipientCount")
      recipientCount?: bigint,
      @as("fee")
      fee?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?merkleInstant,
        ?baseParams,
        ?aggregateAmount,
        ?recipientCount,
        ?fee,
        ?mockEventData,
      } = args

      let params = 
      {
       merkleInstant: merkleInstant->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       baseParams: baseParams->Belt.Option.getWithDefault((TestHelpers_MockAddresses.defaultAddress, 0n, TestHelpers_MockAddresses.defaultAddress, "foo", "foo", "foo", "foo")),
       aggregateAmount: aggregateAmount->Belt.Option.getWithDefault(0n),
       recipientCount: recipientCount->Belt.Option.getWithDefault(0n),
       fee: fee->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.event)
    }
  }

  module CreateMerkleLL = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleFactory_v1_3.CreateMerkleLL.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleFactory_v1_3.CreateMerkleLL.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("merkleLL")
      merkleLL?: Address.t,
      @as("baseParams")
      baseParams?: (Address.t, bigint, Address.t, string, string, string, string),
      @as("lockup")
      lockup?: Address.t,
      @as("cancelable")
      cancelable?: bool,
      @as("transferable")
      transferable?: bool,
      @as("schedule")
      schedule?: (bigint, bigint, bigint, bigint, bigint),
      @as("aggregateAmount")
      aggregateAmount?: bigint,
      @as("recipientCount")
      recipientCount?: bigint,
      @as("fee")
      fee?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?merkleLL,
        ?baseParams,
        ?lockup,
        ?cancelable,
        ?transferable,
        ?schedule,
        ?aggregateAmount,
        ?recipientCount,
        ?fee,
        ?mockEventData,
      } = args

      let params = 
      {
       merkleLL: merkleLL->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       baseParams: baseParams->Belt.Option.getWithDefault((TestHelpers_MockAddresses.defaultAddress, 0n, TestHelpers_MockAddresses.defaultAddress, "foo", "foo", "foo", "foo")),
       lockup: lockup->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       transferable: transferable->Belt.Option.getWithDefault(false),
       schedule: schedule->Belt.Option.getWithDefault((0n, 0n, 0n, 0n, 0n)),
       aggregateAmount: aggregateAmount->Belt.Option.getWithDefault(0n),
       recipientCount: recipientCount->Belt.Option.getWithDefault(0n),
       fee: fee->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierMerkleFactory_v1_3.CreateMerkleLL.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleFactory_v1_3.CreateMerkleLL.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleFactory_v1_3.CreateMerkleLL.event)
    }
  }

  module CreateMerkleLT = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleFactory_v1_3.CreateMerkleLT.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleFactory_v1_3.CreateMerkleLT.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("merkleLT")
      merkleLT?: Address.t,
      @as("baseParams")
      baseParams?: (Address.t, bigint, Address.t, string, string, string, string),
      @as("lockup")
      lockup?: Address.t,
      @as("cancelable")
      cancelable?: bool,
      @as("transferable")
      transferable?: bool,
      @as("streamStartTime")
      streamStartTime?: bigint,
      @as("tranchesWithPercentages")
      tranchesWithPercentages?: array<(bigint, bigint)>,
      @as("totalDuration")
      totalDuration?: bigint,
      @as("aggregateAmount")
      aggregateAmount?: bigint,
      @as("recipientCount")
      recipientCount?: bigint,
      @as("fee")
      fee?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?merkleLT,
        ?baseParams,
        ?lockup,
        ?cancelable,
        ?transferable,
        ?streamStartTime,
        ?tranchesWithPercentages,
        ?totalDuration,
        ?aggregateAmount,
        ?recipientCount,
        ?fee,
        ?mockEventData,
      } = args

      let params = 
      {
       merkleLT: merkleLT->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       baseParams: baseParams->Belt.Option.getWithDefault((TestHelpers_MockAddresses.defaultAddress, 0n, TestHelpers_MockAddresses.defaultAddress, "foo", "foo", "foo", "foo")),
       lockup: lockup->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       transferable: transferable->Belt.Option.getWithDefault(false),
       streamStartTime: streamStartTime->Belt.Option.getWithDefault(0n),
       tranchesWithPercentages: tranchesWithPercentages->Belt.Option.getWithDefault([]),
       totalDuration: totalDuration->Belt.Option.getWithDefault(0n),
       aggregateAmount: aggregateAmount->Belt.Option.getWithDefault(0n),
       recipientCount: recipientCount->Belt.Option.getWithDefault(0n),
       fee: fee->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierMerkleFactory_v1_3.CreateMerkleLT.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleFactory_v1_3.CreateMerkleLT.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleFactory_v1_3.CreateMerkleLT.event)
    }
  }

}


module SablierMerkleInstant_v1_3 = {
  module TransferAdmin = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleInstant_v1_3.TransferAdmin.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleInstant_v1_3.TransferAdmin.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("oldAdmin")
      oldAdmin?: Address.t,
      @as("newAdmin")
      newAdmin?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?oldAdmin,
        ?newAdmin,
        ?mockEventData,
      } = args

      let params = 
      {
       oldAdmin: oldAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newAdmin: newAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierMerkleInstant_v1_3.TransferAdmin.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleInstant_v1_3.TransferAdmin.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleInstant_v1_3.TransferAdmin.event)
    }
  }

  module Clawback = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleInstant_v1_3.Clawback.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleInstant_v1_3.Clawback.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("admin")
      admin?: Address.t,
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?admin,
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       admin: admin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierMerkleInstant_v1_3.Clawback.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleInstant_v1_3.Clawback.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleInstant_v1_3.Clawback.event)
    }
  }

  module Claim = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleInstant_v1_3.Claim.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleInstant_v1_3.Claim.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("index")
      index?: bigint,
      @as("recipient")
      recipient?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?index,
        ?recipient,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       index: index->Belt.Option.getWithDefault(0n),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierMerkleInstant_v1_3.Claim.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleInstant_v1_3.Claim.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleInstant_v1_3.Claim.event)
    }
  }

}


module SablierMerkleLL_v1_3 = {
  module TransferAdmin = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleLL_v1_3.TransferAdmin.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleLL_v1_3.TransferAdmin.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("oldAdmin")
      oldAdmin?: Address.t,
      @as("newAdmin")
      newAdmin?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?oldAdmin,
        ?newAdmin,
        ?mockEventData,
      } = args

      let params = 
      {
       oldAdmin: oldAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newAdmin: newAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierMerkleLL_v1_3.TransferAdmin.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleLL_v1_3.TransferAdmin.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleLL_v1_3.TransferAdmin.event)
    }
  }

  module Clawback = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleLL_v1_3.Clawback.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleLL_v1_3.Clawback.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("admin")
      admin?: Address.t,
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?admin,
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       admin: admin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierMerkleLL_v1_3.Clawback.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleLL_v1_3.Clawback.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleLL_v1_3.Clawback.event)
    }
  }

  module Claim = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleLL_v1_3.Claim.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleLL_v1_3.Claim.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("index")
      index?: bigint,
      @as("recipient")
      recipient?: Address.t,
      @as("amount")
      amount?: bigint,
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?index,
        ?recipient,
        ?amount,
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       index: index->Belt.Option.getWithDefault(0n),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierMerkleLL_v1_3.Claim.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleLL_v1_3.Claim.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleLL_v1_3.Claim.event)
    }
  }

}


module SablierMerkleLT_v1_3 = {
  module TransferAdmin = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleLT_v1_3.TransferAdmin.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleLT_v1_3.TransferAdmin.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("oldAdmin")
      oldAdmin?: Address.t,
      @as("newAdmin")
      newAdmin?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?oldAdmin,
        ?newAdmin,
        ?mockEventData,
      } = args

      let params = 
      {
       oldAdmin: oldAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newAdmin: newAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierMerkleLT_v1_3.TransferAdmin.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleLT_v1_3.TransferAdmin.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleLT_v1_3.TransferAdmin.event)
    }
  }

  module Clawback = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleLT_v1_3.Clawback.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleLT_v1_3.Clawback.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("admin")
      admin?: Address.t,
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?admin,
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       admin: admin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierMerkleLT_v1_3.Clawback.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleLT_v1_3.Clawback.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleLT_v1_3.Clawback.event)
    }
  }

  module Claim = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierMerkleLT_v1_3.Claim.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierMerkleLT_v1_3.Claim.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("index")
      index?: bigint,
      @as("recipient")
      recipient?: Address.t,
      @as("amount")
      amount?: bigint,
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?index,
        ?recipient,
        ?amount,
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       index: index->Belt.Option.getWithDefault(0n),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierMerkleLT_v1_3.Claim.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierMerkleLT_v1_3.Claim.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierMerkleLT_v1_3.Claim.event)
    }
  }

}


module SablierV2LockupDynamic_v1_0 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_0.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_0.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_0.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_0.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_0.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_0.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_0.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_0.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_0.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_0.Transfer.event)
    }
  }

  module CancelLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("senderAmount")
      senderAmount?: bigint,
      @as("recipientAmount")
      recipientAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?senderAmount,
        ?recipientAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       senderAmount: senderAmount->Belt.Option.getWithDefault(0n),
       recipientAmount: recipientAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.event)
    }
  }

  module CreateLockupDynamicStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("funder")
      funder?: Address.t,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("amounts")
      amounts?: (bigint, bigint, bigint),
      @as("asset")
      asset?: Address.t,
      @as("cancelable")
      cancelable?: bool,
      @as("segments")
      segments?: array<(bigint, bigint, bigint)>,
      @as("range")
      range?: (bigint, bigint),
      @as("broker")
      broker?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?funder,
        ?sender,
        ?recipient,
        ?amounts,
        ?asset,
        ?cancelable,
        ?segments,
        ?range,
        ?broker,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       funder: funder->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amounts: amounts->Belt.Option.getWithDefault((0n, 0n, 0n)),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       segments: segments->Belt.Option.getWithDefault([]),
       range: range->Belt.Option.getWithDefault((0n, 0n)),
       broker: broker->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.event)
    }
  }

  module RenounceLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.event)
    }
  }

  module WithdrawFromLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.event)
    }
  }

}


module SablierV2LockupDynamic_v1_1 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_1.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_1.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_1.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_1.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_1.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_1.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_1.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_1.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_1.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_1.Transfer.event)
    }
  }

  module CancelLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("senderAmount")
      senderAmount?: bigint,
      @as("recipientAmount")
      recipientAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?asset,
        ?senderAmount,
        ?recipientAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       senderAmount: senderAmount->Belt.Option.getWithDefault(0n),
       recipientAmount: recipientAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.event)
    }
  }

  module CreateLockupDynamicStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("funder")
      funder?: Address.t,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("amounts")
      amounts?: (bigint, bigint, bigint),
      @as("asset")
      asset?: Address.t,
      @as("cancelable")
      cancelable?: bool,
      @as("transferable")
      transferable?: bool,
      @as("segments")
      segments?: array<(bigint, bigint, bigint)>,
      @as("range")
      range?: (bigint, bigint),
      @as("broker")
      broker?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?funder,
        ?sender,
        ?recipient,
        ?amounts,
        ?asset,
        ?cancelable,
        ?transferable,
        ?segments,
        ?range,
        ?broker,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       funder: funder->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amounts: amounts->Belt.Option.getWithDefault((0n, 0n, 0n)),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       transferable: transferable->Belt.Option.getWithDefault(false),
       segments: segments->Belt.Option.getWithDefault([]),
       range: range->Belt.Option.getWithDefault((0n, 0n)),
       broker: broker->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.event)
    }
  }

  module RenounceLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.event)
    }
  }

  module WithdrawFromLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?asset,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.event)
    }
  }

}


module SablierV2LockupDynamic_v1_2 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_2.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_2.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_2.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_2.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_2.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_2.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_2.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_2.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_2.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_2.Transfer.event)
    }
  }

  module CancelLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("senderAmount")
      senderAmount?: bigint,
      @as("recipientAmount")
      recipientAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?asset,
        ?senderAmount,
        ?recipientAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       senderAmount: senderAmount->Belt.Option.getWithDefault(0n),
       recipientAmount: recipientAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.event)
    }
  }

  module CreateLockupDynamicStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("funder")
      funder?: Address.t,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("amounts")
      amounts?: (bigint, bigint),
      @as("asset")
      asset?: Address.t,
      @as("cancelable")
      cancelable?: bool,
      @as("transferable")
      transferable?: bool,
      @as("segments")
      segments?: array<(bigint, bigint, bigint)>,
      @as("timestamps")
      timestamps?: (bigint, bigint),
      @as("broker")
      broker?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?funder,
        ?sender,
        ?recipient,
        ?amounts,
        ?asset,
        ?cancelable,
        ?transferable,
        ?segments,
        ?timestamps,
        ?broker,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       funder: funder->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amounts: amounts->Belt.Option.getWithDefault((0n, 0n)),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       transferable: transferable->Belt.Option.getWithDefault(false),
       segments: segments->Belt.Option.getWithDefault([]),
       timestamps: timestamps->Belt.Option.getWithDefault((0n, 0n)),
       broker: broker->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.event)
    }
  }

  module RenounceLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.event)
    }
  }

  module WithdrawFromLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?asset,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.event)
    }
  }

}


module SablierV2LockupLinear_v1_0 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_0.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_0.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_0.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_0.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_0.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_0.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_0.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_0.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_0.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_0.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_0.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_0.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_0.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_0.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_0.Transfer.event)
    }
  }

  module CancelLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_0.CancelLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_0.CancelLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("senderAmount")
      senderAmount?: bigint,
      @as("recipientAmount")
      recipientAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?senderAmount,
        ?recipientAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       senderAmount: senderAmount->Belt.Option.getWithDefault(0n),
       recipientAmount: recipientAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_0.CancelLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_0.CancelLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_0.CancelLockupStream.event)
    }
  }

  module CreateLockupLinearStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("funder")
      funder?: Address.t,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("amounts")
      amounts?: (bigint, bigint, bigint),
      @as("asset")
      asset?: Address.t,
      @as("cancelable")
      cancelable?: bool,
      @as("range")
      range?: (bigint, bigint, bigint),
      @as("broker")
      broker?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?funder,
        ?sender,
        ?recipient,
        ?amounts,
        ?asset,
        ?cancelable,
        ?range,
        ?broker,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       funder: funder->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amounts: amounts->Belt.Option.getWithDefault((0n, 0n, 0n)),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       range: range->Belt.Option.getWithDefault((0n, 0n, 0n)),
       broker: broker->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.event)
    }
  }

  module RenounceLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.event)
    }
  }

  module WithdrawFromLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.event)
    }
  }

}


module SablierV2LockupLinear_v1_1 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_1.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_1.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_1.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_1.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_1.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_1.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_1.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_1.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_1.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_1.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_1.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_1.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_1.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_1.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_1.Transfer.event)
    }
  }

  module CancelLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_1.CancelLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_1.CancelLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("senderAmount")
      senderAmount?: bigint,
      @as("recipientAmount")
      recipientAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?asset,
        ?senderAmount,
        ?recipientAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       senderAmount: senderAmount->Belt.Option.getWithDefault(0n),
       recipientAmount: recipientAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_1.CancelLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_1.CancelLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_1.CancelLockupStream.event)
    }
  }

  module CreateLockupLinearStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("funder")
      funder?: Address.t,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("amounts")
      amounts?: (bigint, bigint, bigint),
      @as("asset")
      asset?: Address.t,
      @as("cancelable")
      cancelable?: bool,
      @as("transferable")
      transferable?: bool,
      @as("range")
      range?: (bigint, bigint, bigint),
      @as("broker")
      broker?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?funder,
        ?sender,
        ?recipient,
        ?amounts,
        ?asset,
        ?cancelable,
        ?transferable,
        ?range,
        ?broker,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       funder: funder->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amounts: amounts->Belt.Option.getWithDefault((0n, 0n, 0n)),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       transferable: transferable->Belt.Option.getWithDefault(false),
       range: range->Belt.Option.getWithDefault((0n, 0n, 0n)),
       broker: broker->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.event)
    }
  }

  module RenounceLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.event)
    }
  }

  module WithdrawFromLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?asset,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.event)
    }
  }

}


module SablierV2LockupLinear_v1_2 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_2.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_2.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_2.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_2.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_2.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_2.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_2.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_2.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_2.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_2.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_2.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_2.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_2.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_2.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_2.Transfer.event)
    }
  }

  module CancelLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_2.CancelLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_2.CancelLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("senderAmount")
      senderAmount?: bigint,
      @as("recipientAmount")
      recipientAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?asset,
        ?senderAmount,
        ?recipientAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       senderAmount: senderAmount->Belt.Option.getWithDefault(0n),
       recipientAmount: recipientAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_2.CancelLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_2.CancelLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_2.CancelLockupStream.event)
    }
  }

  module CreateLockupLinearStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("funder")
      funder?: Address.t,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("amounts")
      amounts?: (bigint, bigint),
      @as("asset")
      asset?: Address.t,
      @as("cancelable")
      cancelable?: bool,
      @as("transferable")
      transferable?: bool,
      @as("timestamps")
      timestamps?: (bigint, bigint, bigint),
      @as("broker")
      broker?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?funder,
        ?sender,
        ?recipient,
        ?amounts,
        ?asset,
        ?cancelable,
        ?transferable,
        ?timestamps,
        ?broker,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       funder: funder->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amounts: amounts->Belt.Option.getWithDefault((0n, 0n)),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       transferable: transferable->Belt.Option.getWithDefault(false),
       timestamps: timestamps->Belt.Option.getWithDefault((0n, 0n, 0n)),
       broker: broker->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.event)
    }
  }

  module RenounceLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.event)
    }
  }

  module WithdrawFromLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?asset,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.event)
    }
  }

}


module SablierV2LockupTranched_v1_2 = {
  module Approval = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupTranched_v1_2.Approval.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupTranched_v1_2.Approval.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("approved")
      approved?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?approved,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupTranched_v1_2.Approval.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupTranched_v1_2.Approval.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupTranched_v1_2.Approval.event)
    }
  }

  module ApprovalForAll = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupTranched_v1_2.ApprovalForAll.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupTranched_v1_2.ApprovalForAll.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("owner")
      owner?: Address.t,
      @as("operator")
      operator?: Address.t,
      @as("approved")
      approved?: bool,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?owner,
        ?operator,
        ?approved,
        ?mockEventData,
      } = args

      let params = 
      {
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       operator: operator->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       approved: approved->Belt.Option.getWithDefault(false),
      }
->(Utils.magic: Types.SablierV2LockupTranched_v1_2.ApprovalForAll.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupTranched_v1_2.ApprovalForAll.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupTranched_v1_2.ApprovalForAll.event)
    }
  }

  module Transfer = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupTranched_v1_2.Transfer.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupTranched_v1_2.Transfer.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("from")
      from?: Address.t,
      @as("to")
      to?: Address.t,
      @as("tokenId")
      tokenId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?from,
        ?to,
        ?tokenId,
        ?mockEventData,
      } = args

      let params = 
      {
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tokenId: tokenId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupTranched_v1_2.Transfer.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupTranched_v1_2.Transfer.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupTranched_v1_2.Transfer.event)
    }
  }

  module CancelLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupTranched_v1_2.CancelLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupTranched_v1_2.CancelLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("senderAmount")
      senderAmount?: bigint,
      @as("recipientAmount")
      recipientAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?sender,
        ?recipient,
        ?asset,
        ?senderAmount,
        ?recipientAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       senderAmount: senderAmount->Belt.Option.getWithDefault(0n),
       recipientAmount: recipientAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupTranched_v1_2.CancelLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupTranched_v1_2.CancelLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupTranched_v1_2.CancelLockupStream.event)
    }
  }

  module CreateLockupTranchedStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("funder")
      funder?: Address.t,
      @as("sender")
      sender?: Address.t,
      @as("recipient")
      recipient?: Address.t,
      @as("amounts")
      amounts?: (bigint, bigint),
      @as("asset")
      asset?: Address.t,
      @as("cancelable")
      cancelable?: bool,
      @as("transferable")
      transferable?: bool,
      @as("tranches")
      tranches?: array<(bigint, bigint)>,
      @as("timestamps")
      timestamps?: (bigint, bigint),
      @as("broker")
      broker?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?funder,
        ?sender,
        ?recipient,
        ?amounts,
        ?asset,
        ?cancelable,
        ?transferable,
        ?tranches,
        ?timestamps,
        ?broker,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       funder: funder->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amounts: amounts->Belt.Option.getWithDefault((0n, 0n)),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       transferable: transferable->Belt.Option.getWithDefault(false),
       tranches: tranches->Belt.Option.getWithDefault([]),
       timestamps: timestamps->Belt.Option.getWithDefault((0n, 0n)),
       broker: broker->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.event)
    }
  }

  module RenounceLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.event)
    }
  }

  module WithdrawFromLockupStream = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("streamId")
      streamId?: bigint,
      @as("to")
      to?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?streamId,
        ?to,
        ?asset,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       streamId: streamId->Belt.Option.getWithDefault(0n),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.event)
    }
  }

}


module SablierV2MerkleLL_v1_2 = {
  module TransferAdmin = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleLL_v1_2.TransferAdmin.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleLL_v1_2.TransferAdmin.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("oldAdmin")
      oldAdmin?: Address.t,
      @as("newAdmin")
      newAdmin?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?oldAdmin,
        ?newAdmin,
        ?mockEventData,
      } = args

      let params = 
      {
       oldAdmin: oldAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newAdmin: newAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2MerkleLL_v1_2.TransferAdmin.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleLL_v1_2.TransferAdmin.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleLL_v1_2.TransferAdmin.event)
    }
  }

  module Clawback = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleLL_v1_2.Clawback.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleLL_v1_2.Clawback.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("admin")
      admin?: Address.t,
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?admin,
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       admin: admin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2MerkleLL_v1_2.Clawback.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleLL_v1_2.Clawback.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleLL_v1_2.Clawback.event)
    }
  }

  module Claim = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleLL_v1_2.Claim.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleLL_v1_2.Claim.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("index")
      index?: bigint,
      @as("recipient")
      recipient?: Address.t,
      @as("amount")
      amount?: bigint,
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?index,
        ?recipient,
        ?amount,
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       index: index->Belt.Option.getWithDefault(0n),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2MerkleLL_v1_2.Claim.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleLL_v1_2.Claim.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleLL_v1_2.Claim.event)
    }
  }

}


module SablierV2MerkleLT_v1_2 = {
  module TransferAdmin = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleLT_v1_2.TransferAdmin.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleLT_v1_2.TransferAdmin.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("oldAdmin")
      oldAdmin?: Address.t,
      @as("newAdmin")
      newAdmin?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?oldAdmin,
        ?newAdmin,
        ?mockEventData,
      } = args

      let params = 
      {
       oldAdmin: oldAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newAdmin: newAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2MerkleLT_v1_2.TransferAdmin.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleLT_v1_2.TransferAdmin.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleLT_v1_2.TransferAdmin.event)
    }
  }

  module Clawback = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleLT_v1_2.Clawback.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleLT_v1_2.Clawback.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("admin")
      admin?: Address.t,
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?admin,
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       admin: admin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2MerkleLT_v1_2.Clawback.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleLT_v1_2.Clawback.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleLT_v1_2.Clawback.event)
    }
  }

  module Claim = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleLT_v1_2.Claim.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleLT_v1_2.Claim.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("index")
      index?: bigint,
      @as("recipient")
      recipient?: Address.t,
      @as("amount")
      amount?: bigint,
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?index,
        ?recipient,
        ?amount,
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       index: index->Belt.Option.getWithDefault(0n),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2MerkleLT_v1_2.Claim.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleLT_v1_2.Claim.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleLT_v1_2.Claim.event)
    }
  }

}


module SablierV2MerkleLockupFactory_v1_2 = {
  module CreateMerkleLL = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("merkleLL")
      merkleLL?: Address.t,
      @as("baseParams")
      baseParams?: (Address.t, bool, bigint, Address.t, string, string, string, bool),
      @as("lockupLinear")
      lockupLinear?: Address.t,
      @as("streamDurations")
      streamDurations?: (bigint, bigint),
      @as("aggregateAmount")
      aggregateAmount?: bigint,
      @as("recipientCount")
      recipientCount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?merkleLL,
        ?baseParams,
        ?lockupLinear,
        ?streamDurations,
        ?aggregateAmount,
        ?recipientCount,
        ?mockEventData,
      } = args

      let params = 
      {
       merkleLL: merkleLL->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       baseParams: baseParams->Belt.Option.getWithDefault((TestHelpers_MockAddresses.defaultAddress, false, 0n, TestHelpers_MockAddresses.defaultAddress, "foo", "foo", "foo", false)),
       lockupLinear: lockupLinear->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       streamDurations: streamDurations->Belt.Option.getWithDefault((0n, 0n)),
       aggregateAmount: aggregateAmount->Belt.Option.getWithDefault(0n),
       recipientCount: recipientCount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.event)
    }
  }

  module CreateMerkleLT = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("merkleLT")
      merkleLT?: Address.t,
      @as("baseParams")
      baseParams?: (Address.t, bool, bigint, Address.t, string, string, string, bool),
      @as("lockupTranched")
      lockupTranched?: Address.t,
      @as("tranchesWithPercentages")
      tranchesWithPercentages?: array<(bigint, bigint)>,
      @as("totalDuration")
      totalDuration?: bigint,
      @as("aggregateAmount")
      aggregateAmount?: bigint,
      @as("recipientCount")
      recipientCount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?merkleLT,
        ?baseParams,
        ?lockupTranched,
        ?tranchesWithPercentages,
        ?totalDuration,
        ?aggregateAmount,
        ?recipientCount,
        ?mockEventData,
      } = args

      let params = 
      {
       merkleLT: merkleLT->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       baseParams: baseParams->Belt.Option.getWithDefault((TestHelpers_MockAddresses.defaultAddress, false, 0n, TestHelpers_MockAddresses.defaultAddress, "foo", "foo", "foo", false)),
       lockupTranched: lockupTranched->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       tranchesWithPercentages: tranchesWithPercentages->Belt.Option.getWithDefault([]),
       totalDuration: totalDuration->Belt.Option.getWithDefault(0n),
       aggregateAmount: aggregateAmount->Belt.Option.getWithDefault(0n),
       recipientCount: recipientCount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.event)
    }
  }

}


module SablierV2MerkleStreamerFactory_v1_1 = {
  module CreateMerkleStreamerLL = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("merkleStreamer")
      merkleStreamer?: Address.t,
      @as("admin")
      admin?: Address.t,
      @as("lockupLinear")
      lockupLinear?: Address.t,
      @as("asset")
      asset?: Address.t,
      @as("merkleRoot")
      merkleRoot?: string,
      @as("expiration")
      expiration?: bigint,
      @as("streamDurations")
      streamDurations?: (bigint, bigint),
      @as("cancelable")
      cancelable?: bool,
      @as("transferable")
      transferable?: bool,
      @as("ipfsCID")
      ipfsCID?: string,
      @as("aggregateAmount")
      aggregateAmount?: bigint,
      @as("recipientsCount")
      recipientsCount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?merkleStreamer,
        ?admin,
        ?lockupLinear,
        ?asset,
        ?merkleRoot,
        ?expiration,
        ?streamDurations,
        ?cancelable,
        ?transferable,
        ?ipfsCID,
        ?aggregateAmount,
        ?recipientsCount,
        ?mockEventData,
      } = args

      let params = 
      {
       merkleStreamer: merkleStreamer->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       admin: admin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       lockupLinear: lockupLinear->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       merkleRoot: merkleRoot->Belt.Option.getWithDefault("foo"),
       expiration: expiration->Belt.Option.getWithDefault(0n),
       streamDurations: streamDurations->Belt.Option.getWithDefault((0n, 0n)),
       cancelable: cancelable->Belt.Option.getWithDefault(false),
       transferable: transferable->Belt.Option.getWithDefault(false),
       ipfsCID: ipfsCID->Belt.Option.getWithDefault("foo"),
       aggregateAmount: aggregateAmount->Belt.Option.getWithDefault(0n),
       recipientsCount: recipientsCount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.event)
    }
  }

}


module SablierV2MerkleStreamerLL_v1_1 = {
  module TransferAdmin = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("oldAdmin")
      oldAdmin?: Address.t,
      @as("newAdmin")
      newAdmin?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?oldAdmin,
        ?newAdmin,
        ?mockEventData,
      } = args

      let params = 
      {
       oldAdmin: oldAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newAdmin: newAdmin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.event)
    }
  }

  module Clawback = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleStreamerLL_v1_1.Clawback.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleStreamerLL_v1_1.Clawback.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("admin")
      admin?: Address.t,
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?admin,
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       admin: admin->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2MerkleStreamerLL_v1_1.Clawback.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleStreamerLL_v1_1.Clawback.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleStreamerLL_v1_1.Clawback.event)
    }
  }

  module Claim = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.SablierV2MerkleStreamerLL_v1_1.Claim.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.SablierV2MerkleStreamerLL_v1_1.Claim.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("index")
      index?: bigint,
      @as("recipient")
      recipient?: Address.t,
      @as("amount")
      amount?: bigint,
      @as("streamId")
      streamId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?index,
        ?recipient,
        ?amount,
        ?streamId,
        ?mockEventData,
      } = args

      let params = 
      {
       index: index->Belt.Option.getWithDefault(0n),
       recipient: recipient->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
       streamId: streamId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.SablierV2MerkleStreamerLL_v1_1.Claim.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.SablierV2MerkleStreamerLL_v1_1.Claim.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.SablierV2MerkleStreamerLL_v1_1.Claim.event)
    }
  }

}

