// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DataNFT is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable, EIP712, ERC721Votes {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct datahausERC721NFT {
        address owner;
        string tokenURI;
        uint256 tokenId;
    }

    datahausERC721NFT[] public nftCollection;
    mapping(address => datahausERC721NFT[]) public nftCollectionByOwner;

    event NewNFTMinted(
      address indexed sender,
      uint256 indexed tokenId,
      string tokenURI
    );

    constructor() ERC721("DataNFT", "dNFT") EIP712("DataNFT", "1") {}

    function safeMint(address to, string memory uri) 
        public 
        returns (uint256) 
    {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        
        datahausERC721NFT memory dNFT = datahausERC721NFT({
            owner: msg.sender,
            tokenURI: uri,
            tokenId: tokenId
        });

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        nftCollection.push(dNFT);
        nftCollectionByOwner[to].push(dNFT);

        emit NewNFTMinted(
          msg.sender,
          tokenId,
          uri
        );

        return tokenId;
    }

    function mintMultipleNFTs(address owner, string[] memory uri) public returns (uint256[] memory)
    {
        uint256 length = uri.length;
        uint256[] memory tokenIdArray = new uint256[](length);

        uint i=0;
        for (i = 0; i < length; i ++) {
            tokenIdArray[i] = safeMint(owner, uri[i]);     
        }

        return tokenIdArray;
    }

    /**
     * @notice Helper function to display NFT Collection for Frontend
     */
    function getNFTCollection() public view returns (datahausERC721NFT[] memory) {
        return nftCollection;
    }

    /**
     * @notice helper function to fetch NFT's by owner
     */
    function getNFTCollectionByOwner(address owner) public view returns (datahausERC721NFT[] memory){
        return nftCollectionByOwner[owner];
    }

    /* The following functions are overrides required by Solidity. */

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
