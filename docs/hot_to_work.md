
# How to  work


### Prepare

#### 1) Deploy sample smart contract like this.

```rust
contract Sample {
    pub amount: u248;

    pub fn new() -> Self {
        Self {
            amount: 0 as u248
        }
    }

    fn send(mut self, address: u160, amount: u248) {
        self.transfer(
            address, // recipient address
            0x0, // zkSync ETH token address
            amount, // amount in wei
        );
        self.amount = amount;
    }

    pub fn get_amount(self) -> u248 {
        self.amount
    }
}
```

this is the result.
```sh
$ zargo publish --instance default --network rinkeby
   Compiling sample v0.1.0
    Finished release [optimized] target
   Uploading the instance `default` of `sample v0.1.0` to network `rinkeby`
     Address 0xe53ee624a76a8eae26b2962b0756d8515c039b9e
  Account ID 144805
```


#### 2) Attach user to contract as executor

```json
"arguments": {
  "attach_user_to_contract": {
    "addr": "0xDB10E4a083B87e803594c12c679422dCe5FCCCB9",
    "role": "0",
    "contractAddr": "0xe53ee624a76a8eae26b2962b0756d8515c039b9e"
  }
}
```

```sh
$ zargo call --network rinkeby --address 0x84407aaf4998167f8f26dde873c67d36205134b8 --method attach_user_to_contract
     Calling method `attach_user_to_contract` of the contract `koku v0.2.0` with address 0x84407aaf4998167f8f26dde873c67d36205134b8 on network `rinkeby`
{
  "output": {
    "result": null,
    "root_hash": "0x0"
  }
}
```

Same as above, attach user as legislator, judgement.

`0xDB10E4a083B87e803594c12c679422dCe5FCCCB9` : `Executor(0)` 
`0x4Ac5EC62CeA97De5cF3a58BD9EF41FfAe911363D` : `Legislator(1)` 
`0x26920280a926A18Df806Ba51Ff12cb630f0585FC` : `Judgement(2)` 

#### 3) Check role

example of checking user role.
```json
"get_role_by_contract": {
  "addr": "0x26920280a926A18Df806Ba51Ff12cb630f0585FC",
  "contractAddr": "0xe53ee624a76a8eae26b2962b0756d8515c039b9e"
}
```

```
$ zargo query --network rinkeby --address 0x84407aaf4998167f8f26dde873c67d36205134b8 --method get_role_by_contract
    Querying method `get_role_by_contract` of the contract `koku v0.2.0` with address 0x84407aaf4998167f8f26dde873c67d36205134b8 on network `rinkeby`
{
  "output": "2"
}
```

### 4) Call invalid function

Executor cannot call `legislate`.

```
zargo call --network rinkeby --address 0x84407aaf4998167f8f26dde873c67d36205134b8 --method legislate
     Calling method `legislate` of the contract `koku v0.4.0` with address 0x84407aaf4998167f8f26dde873c67d36205134b8 on network `rinkeby`
[ERROR zargo] contract fee calculating request: HTTP error (422 Unprocessable Entity) Runtime: RequireError("sender should be legislator")  
```

