import Button from "@material-ui/core/Button";
// import clientPromise from '../lib/mongodb'

export default function Home({ isConnected, listingsAndReviews }) {
  return (<>Home page
    <Button variant="outlined">Default</Button>
    <Button variant="outlined" color="primary">
      Primary
    </Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" disabled>
      Disabled
    </Button>
    <Button variant="outlined" color="primary" href="#outlined-buttons">
      Link
    </Button>
  </>)
}

export async function getServerSideProps(context) {
  try {
    // await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the folloing code:
    //
    // const client = await clientPromise
    // const db = client.db("sample_airbnb")
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    // let listingsAndReviews = await db.collection("listingsAndReviews").find({}).toArray();
    // listingsAndReviews = JSON.parse(JSON.stringify(listingsAndReviews));

    return {
      props: { isConnected: true, listingsAndReviews: [] },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
