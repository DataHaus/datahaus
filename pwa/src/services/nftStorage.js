import { NFTStorage } from "nft.storage";

const NFT_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_KEY;

/**
 * Upload Blob to NFT Storage
 *
 * @typedef {Object} SafeAsync
 * @property {Boolean|Error} error
 * @property {FileDetail} data
 * @param {File} file
 * @returns {Promise<SafeAsync>}
 */
export const uploadBlobNFTStorage = async (file) => {
  let detail = getCidDetail({ cid: null, file });

  /* Max 50MB Upload size*/
  if (file.size > 52428800) {
    return [new Error(`Maximum file upload size 50 MB`), detail];
  }

  try {
    if (file.size === 0) {
      throw new Error("Content size is 0, make sure to provide some content");
    }

    const client = new NFTStorage({ token: NFT_STORAGE_KEY });
    const cid = await client.storeBlob(file);

    console.log("NFT Storage CID: ", cid);

    detail = getCidDetail({ cid, file });
    return { error: false, data: detail };
  } catch (error) {
    return { error, data: detail };
  }
};

/** 
* Fetch pinning info from NFT.Storage
* @param {String} cid - IPFS content identifier CID
*/ 
export const fetchCIDStatus = async (cid) => {
  console.log("NFT Storage CID: ", cid);
  try {
    const client = new NFTStorage({ token: NFT_STORAGE_KEY });
    const cidStatus = await client.status(cid);

    console.log("NFT Storage CID: ", cid);
    
    return { error: false, cidStatus: cidStatus };
  } catch (error) {
    return { error, data: detail };
  }
};

/**
 * Get CID file details
 *
 * @typedef {Object} FileDetail
 * @property {String} cid
 * @property {Object} file
 * @property {String} file.name
 * @property {String} file.type
 * @property {Number} file.size
 * @property {Number} file.created_at
 *
 * @param {Object} params
 * @param {String} params.cid
 * @param {File} params.file
 * @returns {FileDetail}
 */
export const getCidDetail = ({ cid, file }) => {
  const base = {
    name: file.name,
    type: file.type,
    size: file.size,
    created_at: Date.now(),
  };
  if (!cid) return { cid: null, file: base };
  return {
    cid,
    file: base,
  };
};
