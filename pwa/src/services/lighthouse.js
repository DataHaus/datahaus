import lighthouse from '@lighthouse-web3/sdk';

const lighthouseApiKey = import.meta.env.VITE_LIGHTHOUSE_STORAGE_KEY;


const progressCallback = (progressData) => {
  let percentageDone =
    100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  console.log(percentageDone);
};

/**
 * Upload Blob to LightHouse
 *
 * @typedef {Object} SafeAsync
 * @property {Boolean|Error} error
 * @property {FileDetail} data
 * @param {File} file
 * @returns {Promise<SafeAsync>}
 */
export const uploadBlob = async (file) => {
  let detail = getCidDetail({ cid: null, file });

  /* Max 50MB Upload size*/
  if (file.size > 52428800) {
    return [new Error(`Maximum file upload size 50 MB`), detail];
  }
  
  try {
    /* Push file to lighthouse node */
    const output = await lighthouse.upload(file, lighthouseApiKey, progressCallback);
    console.log('File Status:', output);
    /*
      output:
        {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);

    const cid = output.data.Hash;

    detail = getCidDetail({ cid, file });

    return { error: false, data: detail };
  } catch (error) {
    return { error, data: detail };
  }
}

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


