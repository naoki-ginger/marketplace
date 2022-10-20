# marketplace

市场的主旨是提供一个平台，让供需双方能够有地方进行nft的交易。市场提供了两种拍卖模式，第一种是直买直卖，第二种是竞价拍卖。

直买直卖：卖方设定一个价格，买方支付完之后立刻获得货物。

竞价拍卖：卖方设定一个起始拍卖价格以及拍卖时间，在拍卖时间内任意用户可以出价，当出价高于之前用户出价时记为有效。拍卖时间结束后，价格最高的用户可以领取货物。

# 类型定义

## OrderType
枚举值，表示订单类型

1. **Sell**：直卖单
2. **Buy**：求购单
3. **Auction**：英式拍卖单
4. **DutchAuction**：荷式拍卖单

## NFTType
枚举值，表示nft类型
1. **ERC721**：ERC721类型
2. **ERC1155**：ERC1155类型

## Order
订单详情

|  数据类型   | 变量名  | 描述 |
|  ----  | ----  |  ---- |
| uint256  | id | 订单编号，自增|
| uint256  | orderType |  订单类型，1: 直卖单；2:求购单；3:竞拍单|
| address  | orderOwner | 订单创建者地址|
| address  | token| 用于支付的erc20的代币哈希 |
| uint256  | price | 支付的erc20代币数量|
| address  | nftToken | 交易nft的合约哈希|
| uint256  | tokenId |  nft的tokenId|
| uint256  | startTime | 订单的开始时间|
| uint256  | endTime| 订单的截止时间 |
| uint256  | leastPercent  | 竞拍时加价的最低比例|

## BidInfo
当前最高出价信息

|  数据类型   | 变量名  | 描述 |
|  ----  | ----  |  ---- |
| address  | bidder | 最高出价者地址|
| uint256  | price |  最高出价|

## NFTType
NFT详细信息

|  数据类型   | 变量名  | 描述 |
|  ----  | ----  |  ---- |
| NFTType  | nftType | nft类型，0：erc721，1：erc1155|
| address  | nftToken |  nft合约地址|
| uint256  | tokenId | nft的tokenId|
| uint256  | tokenAmount |  对于erc721型nft，该值为1|
# API
## 写方法

### **createOrder**
创建订单，包括创建直卖单、求购单、英式竞拍单，荷式竞拍单。


Parameters
-   `(uint256)`    订单类型，1: 直卖单；2:求购单；3:英式竞拍单；4: 荷式竞拍单
-   `(NFTType)`    nft类型，ERC721/ERC1155
-   `(address)`    交易的nft的合约哈希
-   `(uint256)`    nft的tokenId
-   `(uint256)`    token数量，对于ERC721型nft，该值为1
-   `(address)`    用于支付的erc20代币的合约哈希
-   `(uint256)`    支付的erc20的数量
-   `(uint256)`    订单的有效期，单位：天
-   `(uint256)`    英式竞拍单时，为最低加价比例；荷式竞拍单时，为每小时减价的比例
-   `(uint256)`    荷式竞拍单生效，为最低价

Returns
-   无

### **cancelOrder**
取消订单

注：当竞拍单有人出价时，订单不可取消

Parameters
-   `(uint256)`    订单编号Id

Returns
-   无

### **fulfillOrder**
完成订单

注：只能成交直卖单、求购单、荷式竞拍单

Parameters
-   `(uint256)`    订单编号Id
-   `(uint256)`    支付的erc20的金额

Returns
-   无

### **changeOrder**
修改订单信息

注：只能修改直卖单、求购单

Parameters
-   `(uint256)`    订单编号Id
-   `(uint256)`    支付的erc20的金额
-   `(uint256)`    订单的有效期，单位：天

Returns
-   无

### **bid**
参与竞拍

注：只能用于英式竞拍

Parameters
-   `(uint256)`    订单编号Id
-   `(uint256)`    支付的erc20的金额

Returns
-   无

### **claim**
竞拍完成后，领取nft

注：只能用于英式竞拍

Parameters
-   `(uint256)`    订单编号Id

Returns
-   无

## 读方法

### **name**

Parameters
-   无

Returns
-   `string` 合约名称

### **getTradeFeeRate**

Parameters
-   无

Returns
-   `uint256` 合约收取的手续费比例

### **getOrder**

Parameters
-   `uint256` 订单编号Id

Returns
-   `Order` 订单详情

### **getDutchPrice**

Parameters
-   `uint256` 订单编号Id

Returns
-   `uint256` 获取荷式竞拍单当前的竞拍价

### **getBidInfo**

Parameters
-   `uint256` 订单编号Id

Returns
-   `BidInfo` 当前最高出价信息

### **getOrdersByOwner**

Parameters
-   `address` 订单创建者地址

Returns
-   `Order[]` 创建的订单详情列表

### **getOrdersByNft**

Parameters
-   `address` nft合约哈希
-   `uint256` nft的tokenId

Returns
-   `Order[]` nft相关的订单详情列表








