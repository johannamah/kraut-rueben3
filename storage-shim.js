// --- Cloud-Speicher über JSONBin.io, ersetzt Claudes window.storage ---
const JSONBIN_ID = '6a7b7609da38895dfed73dc4';
const JSONBIN_KEY = '$2a$10$3hq9vTJca2Sy31OZ9gQNC.E0urtTxZ0ppfbgPtxvfXucAAJd/e9d2';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_ID}`;

async function readBin() {
  let res;
  try {
    res = await fetch(JSONBIN_URL + '/latest', {
      headers: { 'X-Master-Key': JSONBIN_KEY },
      cache: 'no-store',
    });
  } catch (networkErr) {
    throw new Error('Netzwerkfehler beim Lesen (evtl. blockiert/offline): ' + networkErr.message);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`JSONBin Lesefehler (HTTP ${res.status}): ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.record || {};
}

async function writeBin(record) {
  let res;
  try {
    res = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_KEY },
      body: JSON.stringify(record),
    });
  } catch (networkErr) {
    throw new Error('Netzwerkfehler beim Schreiben (evtl. blockiert/offline): ' + networkErr.message);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`JSONBin Schreibfehler (HTTP ${res.status}): ${body.slice(0, 200)}`);
  }
}

window.storage = {
  async get(key) {
    const record = await readBin();
    if (!(key in record)) return null;
    return { key, value: record[key] };
  },
  async set(key, value) {
    const record = await readBin();
    record[key] = value;
    await writeBin(record);
    return { key, value };
  },
  async delete(key) {
    const record = await readBin();
    const existed = key in record;
    delete record[key];
    await writeBin(record);
    return { key, deleted: existed };
  },
  async list(prefix) {
    const record = await readBin();
    const keys = Object.keys(record).filter(k => !prefix || k.startsWith(prefix));
    return { keys, prefix };
  },
};
