import { Web3Storage } from 'web3.storage';

const web3StorageApiKey = import.meta.env.VITE_WEB3_STORAGE_KEY;

/**
 * Upload Blob to Web3 Storage
 *
 * @typedef {Object} SafeAsync
 * @property {Boolean|Error} error
 * @property {FileDetail} data
 * @param {File} file
 * @returns {Promise<SafeAsync>}
 */
export const uploadBlob = async (file) => {
  // Web3.Storage Construct with token and endpoint
  const client = new Web3Storage({ token: web3StorageApiKey });

  let detail = getCidDetail({ cid: null, file });

  /* Max 50MB Upload size*/
  if (file.size > 52428800) {
    return [new Error(`Maximum file upload size 50 MB`), detail];
  }

  try {
    /* Pack files into a CAR and send to web3.storage */
    const rootCid = await client.put(fileInput.files) // Promise<CIDString>
    console.log("Web3.Storage CID: ", cid);

    /* Get info on the Filecoin deals that the CID is stored in */
    const dealsInfo = await client.status(rootCid) // Promise<Status | undefined>
    let details = [];

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid) // Promise<Web3Response | null>
    const files = await res.files() // Promise<Web3File[]>
    
    for (const file of files) {

      console.log(`File details: ${file.cid} ${file.name} ${file.size}`)

      /* Load our results into and Array indexed by the rootCid */
      details[rootCid] = getCidDetail({ rootCid, file });
      console.log('details[rootCid]',details[rootCid]);
      
    }
    
    return { error: false, data: details, dealsInfo: dealsInfo };
  } catch (error) {
    return { error, data: detail, dealsInfo: dealsInfo };
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
