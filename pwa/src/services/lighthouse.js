import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

const lighthouseApiKey = import.meta.env.VITE_LIGHTHOUSE_STORAGE_KEY;

/* Percentage Complete Function */
const progressCallback = (progressData) => {
  let percentageDone =
    100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  console.log(percentageDone);
};

/* Get Encryption Signature */
const encryptionSignature = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const messageRequested = (await lighthouse.getAuthMessage(address)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return {
    signedMessage: signedMessage,
    publicKey: address,
  };
};

/* Sign Authenticate Message */
const sign_auth_message = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const publicKey = (await signer.getAddress()).toLowerCase();
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return { publicKey: publicKey, signedMessage: signedMessage };
};


/* Share file */
export const shareFile = async (cid) => {
  // Then get auth message and sign
  // Note: message should be signed by owner of file.
  const { publicKey, signedMessage } = await signAuthMessage();

  const publicKeyUserB = ["0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"];

  const res = await lighthouse.shareFile(
    publicKey,
    publicKeyUserB,
    cid,
    signedMessage
  );

  console.log(res);
  /*
    data: {
      cid: "QmTTa7rm2nMjz6wCj9pvRsadrCKyDXm5Vmd2YyBubCvGPi",
      shareTo: "0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"
    }
  */
  /*Visit: 
      https://files.lighthouse.storage/viewFile/<cid>  
    To view encrypted file
  */
};


export const applyAccessConditions = async (e) => {
  // CID on which you are applying encryption
  // CID is generated by uploading a file with encryption
  // Only the owner of the file can apply access conditions
  const cid = "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh";

  // Conditions to add
  const conditions = [
    {
      id: 1,
      chain: "Optimism",
      method: "getBlockNumber",
      standardContractType: "",
      returnValueTest: {
        comparator: ">=",
        value: "13349",
      },
    },
  ];

  // Aggregator is what kind of operation to apply to access conditions
  // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
  const aggregator = "([1])";
  const { publicKey, signedMessage } = await encryptionSignature();

  /*
      accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
        Parameters:
          publicKey: owners public key
          CID: CID of file to decrypt
          signedMessage: message signed by owner of publicKey
          conditions: should be in format like above
          aggregator: aggregator to apply on conditions
    */
  const response = await lighthouse.accessCondition(
    publicKey,
    cid,
    signedMessage,
    conditions,
    aggregator
  );

  console.log(response);
  /*
      {
        data: {
          cid: "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh",
          status: "Success"
        }
      }
    */
};

/**
 * Encrypt data with LightHouse
 *
 * @property {Boolean|Error} error
 * @property {FileDetail} data
 * @param {File} file
 */
export const encryptLightHouse = async (file) => {
  let detail = getCidDetail({ cid: null, file });

  /* Max 50MB Upload size*/
  if (file.size > 52428800) {
    return [new Error(`Maximum file upload size 50 MB`), detail];
  }

  try {
    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      file,
      sig.publicKey,
      lighthouseApiKey,
      sig.signedMessage,
      progressCallback
    );
    console.log("Encrypt response", response);

    /*
      output:
        {
          Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
          Size: "318557",
          Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
        }
      Note: Hash in response is CID.
    */

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );

    const cid = output.data.Hash;

    detail = getCidDetail({ cid, file });

    return { error: false, data: detail };
  } catch (error) {
    return { error, data: detail };
  }
};

/**
 * Decrypt data with LightHouse
 *
 * @property {Boolean|Error} error
 * @property {FileDetail} data
 * @param {File} file
 */
export const decryptLightHouse = async (cid) => {
  if (!cid) {
    return [new Error(`No content identifier or CID given`), cid];
  }

  const { publicKey, signedMessage } = await sign_auth_message();
  console.log(signedMessage);
  /*
    fetchEncryptionKey(cid, publicKey, signedMessage)
      Parameters:
        CID: CID of the file to decrypt
        publicKey: public key of the user who has access to file or owner
        signedMessage: message signed by the owner of publicKey
  */
  const keyObject = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage
  );

  // Decrypt file
  /*
  decryptFile(cid, key, mimeType)
    Parameters:
      CID: CID of the file to decrypt
      key: the key to decrypt the file
      mimeType: default null, mime type of file
*/

  const fileType = "image/jpeg";
  const decrypted = await lighthouse.decryptFile(
    cid,
    keyObject.data.key,
    fileType
  );
  console.log(decrypted);
  /*
    Response: blob
  */

  /* View File */
  const url = URL.createObjectURL(decrypted);
  console.log("Decrypt URL : ", url);

  return { data: url };
};

/**
 * Upload Blob to LightHouse
 *
 * @property {Boolean|Error} error
 * @property {FileDetail} data
 * @param {File} file
 */
export const uploadBlobLightHouse = async (file) => {
  let detail = getCidDetail({ cid: null, file });

  /* Max 50MB Upload size*/
  if (file.size > 52428800) {
    return [new Error(`Maximum file upload size 50 MB`), detail];
  }

  try {
    /* Push file to lighthouse node */
    const output = await lighthouse.upload(
      file,
      lighthouseApiKey,
      progressCallback
    );
    console.log("File Status:", output);
    /*
      output:
        {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );

    const cid = output.data.Hash;

    detail = getCidDetail({ cid, file });

    return { error: false, data: detail };
  } catch (error) {
    return { error, data: detail };
  }
};

/**
 * Upload a buffer/streams to Lighthouse.
 *
 * @property {Boolean|Error} error
 * @property {FileDetail} data
 * @param {File} file
 */
export const uploadBufferLightHouse = async (file) => {
  let detail = getCidDetail({ cid: null, file });

  /* Max 50MB Upload size*/
  if (file.size > 52428800) {
    return [new Error(`Maximum file upload size 50 MB`), detail];
  }

  try {
    /* Push file to lighthouse node */
    const output = await lighthouse.uploadBuffer(
      file,
      lighthouseApiKey,
      progressCallback
    );
    console.log("File Status:", output);
    /*
      output:
        {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );

    const cid = output.data.Hash;

    detail = getCidDetail({ cid, file });

    return { error: false, data: detail };
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
