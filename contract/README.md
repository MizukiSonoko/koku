
```shell
$ zargo publish --instance default --network rinkeby
   Compiling koku v0.4.0
    Finished release [optimized] target
   Uploading the instance `default` of `koku v0.4.0` to network `rinkeby`
     Address 0x84407aaf4998167f8f26dde873c67d36205134b8
  Account ID 144905
```

```shell
$ zargo query --address 0xd1ce984f52bab9a2222ffd24b816453144effeef --network rinkeby
    Querying the storage of the contract `koku v0.2.0` with address 0xd1ce984f52bab9a2222ffd24b816453144effeef on network `rinkeby`
{
  "address": "0xd1ce984f52bab9a2222ffd24b816453144effeef",
  "balances": [
    {
      "key": "0x0",
      "value": "65400000000000"
    }
  ]
}
```

```shell
$ zargo query --network rinkeby --address 0x7093fd6f2aba247610714557ea09c02cfaac9892 --method get_group_by_rule
```

```shell
$ zargo query --network rinkeby --address 0x7093fd6f2aba247610714557ea09c02cfaac9892 --method get_group
```

```shell
zargo call --network rinkeby --address 0xd1ce984f52bab9a2222ffd24b816453144effeef --method attach_user_to_contract
     Calling method `create_group` of the contract `koku v0.1.1` with address 0x7093fd6f2aba247610714557ea09c02cfaac9892 on network `rinkeby`
{
  "output": {
    "result": null,
    "root_hash": "0x0"
  }
}
```

curl -X PUT -H "Content-Type: application/json" -d '{}' "https://rinkeby3-zandbox.zksync.dev/api/v1/contract/query?address=0x7093fd6f2aba247610714557ea09c02cfaac9892&method=get_group"

curl -X PUT -H "Content-Type: application/json" --data-raw '{"arguments": { "groupId":"0" }}' "https://rinkeby3-zandbox.zksync.dev/api/v1/contract/query?address=0x7093fd6f2aba247610714557ea09c02cfaac9892&method=get_group"

curl -X POST -H "Content-Type: application/json" -d '{"arguments": { "groupId":"0" }}' "https://rinkeby3-zandbox.zksync.dev/api/v1/contract/call?address=0x7093fd6f2aba247610714557ea09c02cfaac9892&method=create_group" | jq