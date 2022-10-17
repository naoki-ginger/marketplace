// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IMarket {
    event CreateOrder(
        uint256 indexed id,
        uint256 indexed orderType,
        address indexed orderOwner,
        address nftToken,
        uint256 tokenId,
        address token,
        uint256 price,
        uint256 startTime,
        uint256 endTime,
        uint256 leastPercent
    );

    event ChangeOrder(
        uint256 indexed id,
        uint256 indexed orderType,
        address indexed orderOwner,
        address nftToken,
        uint256 tokenId,
        address token,
        uint256 price,
        uint256 startTime,
        uint256 endTime,
        uint256 leastPercent
    );

    event CompleteOrder(
        uint256 indexed id,
        uint256 indexed orderType,
        address indexed orderOwner,
        address payer,
        address nftToken,
        uint256 tokenId,
        address token,
        uint256 price,
        uint256 startTime,
        uint256 endTime,
        uint256 leastPercent
    );

    event CancelOrder(
        uint256 indexed id,
        uint256 indexed orderType,
        address indexed orderOwner,
        address nftToken,
        uint256 tokenId
    );

    event Bid(
        uint256 indexed id,
        uint256 indexed orderType,
        address indexed orderOwner,
        address bidder,
        uint256 bidTime,
        address token,
        uint256 price,
        address nftToken,
        uint256 tokenId
    );

    struct Order {
        uint256 id; //order id
        uint256 orderType; // 1: sell nft, 2: buy nft, 3: auction
        address orderOwner; //order owner
        address token; //pa token address
        uint256 price; //order price
        address nftToken; //nft token address
        uint256 tokenId; // token id
        uint256 startTime; // order start timestimp
        uint256 endTime; // order end timestimp
        uint256 leastPercent; // least Percent for auction
    }

    struct BidInfo {
        address bidder; // bidder
        uint256 price; // highest price
    }

    // read methods
    function name() external pure returns (string memory);

    function getTradeFeeRate() external view returns (uint256);

    function getOrder(uint256 orderId) external view returns (Order memory);

    function getBidInfo(uint256 orderId) external view returns (BidInfo memory);

    function getOrdersByOwner(address orderOwner)
        external
        view
        returns (Order[] memory);

    function getOrdersByNft(address nftToken, uint256 tokenId)
        external
        view
        returns (Order[] memory);

    // write methods
    function createOrder(
        uint256 orderType,
        address nftToken,
        uint256 tokenId,
        address token,
        uint256 price,
        uint256 timeLimit,
        uint256 leastPercent
    ) external returns (uint256);

    function cancelOrder(uint256 orderId) external;

    function fulfillOrder(uint256 orderId, uint256 price) external;

    function changeOrder(
        uint256 orderId,
        uint256 price,
        uint256 timeLimit,
        uint256 leastPercent
    ) external;

    function bid(uint256 orderId, uint256 price) external;

    function claim(uint256 orderId) external;
}
