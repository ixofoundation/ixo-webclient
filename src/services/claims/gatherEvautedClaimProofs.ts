import axios from 'axios';
import { Evaluation } from 'generated/graphql';

// Define the record type
type Record = Evaluation & {
  verificationData?: any;
};

// Fetch data from a given URL
const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

// Process records with concurrency control
const processRecords = async (records: Record[], concurrencyLimit: number) => {
  const semaphore: { count: number } = { count: concurrencyLimit };

  const withSemaphore = async <T>(fn: () => Promise<T>): Promise<T> => {
    while (semaphore.count <= 0) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    semaphore.count--;
    try {
      return await fn();
    } finally {
      semaphore.count++;
    }
  };

  const processRecord = async (record: Record): Promise<Record> => {
    const url = `https://${record.verificationProof}.ipfs.w3s.link`;
    const verificationData = await withSemaphore(() => fetchData(url));
    return {
      ...record,
      verificationData
    };
  };

  const promises = records.map(record => processRecord(record));
  return Promise.all(promises);
};


export const gatherEvaluatedClaimProofs = async (evaluatedClaims: Record[], concurrencyLimit: number) => {
  const updatedRecords = await processRecords(evaluatedClaims, concurrencyLimit);
  return updatedRecords;
}
