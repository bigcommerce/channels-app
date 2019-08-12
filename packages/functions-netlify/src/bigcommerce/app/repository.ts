import faunadb from 'faunadb'

const q = faunadb.query

export async function createRecord(faunadbClient, storeData) {
    console.log(`Creating store app record for ... ${storeData.context}`)

    return faunadbClient.query(
        q.Create(
            q.Collection("bigcommerce_stores"),
            { data: storeData }
        )
    )
}

export async function fetchRecord(faunadbClient, storeHash) {
    console.log(`Fetching store app record for ... ${storeHash}`)

    const record = await faunadbClient.query(
        q.Get(
            q.Match(
                q.Index("store_hash"), storeHash
            )
        )
    )

    return record.data
}

export async function deleteRecord(faunadbClient, storeHash) {
    console.log(`Deleting store app record for ... ${storeHash}`)

    const x = await faunadbClient.query(
        q.Get(
            q.Match(
                q.Index("store_hash"), storeHash
            )
        )
    )

    return faunadbClient.query(q.Delete(q.Ref(q.Collection("bigcommerce_stores"), x.ref.id)))

}