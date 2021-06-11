
```shell
$ zargo publish --instance default --network rinkeby
   Compiling koku v0.1.1
    Finished release [optimized] target
   Uploading the instance `default` of `koku v0.1.1` to network `rinkeby`
     Address 0x7093fd6f2aba247610714557ea09c02cfaac9892
  Account ID 139749
```

```shell
$ zargo query --address 0x7093fd6f2aba247610714557ea09c02cfaac9892 --network rinkeby
    Querying the storage of the contract `koku v0.1.1` with address 0x7093fd6f2aba247610714557ea09c02cfaac9892 on network `rinkeby`
{
  "address": "0x7093fd6f2aba247610714557ea09c02cfaac9892",
  "balances": [
    {
      "key": "0x0",
      "value": "62900000000000"
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
zargo call --network rinkeby --address 0x7093fd6f2aba247610714557ea09c02cfaac9892 --method create_group
     Calling method `create_group` of the contract `koku v0.1.1` with address 0x7093fd6f2aba247610714557ea09c02cfaac9892 on network `rinkeby`
{
  "output": {
    "result": null,
    "root_hash": "0x0"
  }
}
```

curl 'https://rinkeby3-zandbox.zksync.dev/api/v1/contract/query?address=0x7093fd6f2aba247610714557ea09c02cfaac9892&method=get_group' \
  -X 'PUT' \
  -H 'authority: rinkeby3-zandbox.zksync.dev' \
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'dnt: 1' \
  -H 'sec-ch-ua-mobile: ?1' \
  -H 'user-agent: Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Mobile Safari/537.36' \
  -H 'content-type: application/json;charset=UTF-8' \
  -H 'origin: http://localhost:3000' \
  -H 'sec-fetch-site: cross-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: http://localhost:3000/' \
  -H 'accept-language: ja,en-US;q=0.9,en;q=0.8,ja-JP;q=0.7' \
  --data-raw '{"headers":{"Content-Type":"application/json"},"data":{"arguments":{"groupId":"0"}},"params":{"arguments":{"groupId":"0"}}}' \
  --compressed

curl -X PUT -H "Content-Type: application/json" -d '{}' "https://rinkeby3-zandbox.zksync.dev/api/v1/contract/query?address=0x7093fd6f2aba247610714557ea09c02cfaac9892&method=get_group"

curl -X PUT -H "Content-Type: application/json" --data-raw '{"arguments": { "groupId":"0" }}' "https://rinkeby3-zandbox.zksync.dev/api/v1/contract/query?address=0x7093fd6f2aba247610714557ea09c02cfaac9892&method=get_group"

curl -X POST -H "Content-Type: application/json" -d '{"arguments": { "groupId":"0" }}' "https://rinkeby3-zandbox.zksync.dev/api/v1/contract/call?address=0x7093fd6f2aba247610714557ea09c02cfaac9892&method=create_group" | jq