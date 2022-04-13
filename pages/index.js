// import clientPromise from '../lib/mongodb'
import {Button} from '../components/primitives/Button'
import {Input, SearchInput} from '../components/primitives/Input'
import {Select} from '../components/primitives/Select'
import {Checkbox} from '../components/primitives/Checkbox'
import {Radio} from '../components/primitives/Radio'
import {Switch} from '../components/primitives/Switch'
import {
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

export default function Home({isConnected, listingsAndReviews}) {
  return (<>
    <div>
      <Button variant="outlined" color="primary">
        Choose start trigger
      </Button>
    </div>
    <br/>
    <div>
      <Input placeholder={'First name'}/>
    </div>
    <br/>
    <div>
      <Input rows={4} multiline placeholder={'Send new messenge ...'}/>
    </div>

    <br/>
    <div>
      <KeyboardDateTimePicker
        variant="inline"
        margin="normal"
      />
    </div>

    <br/>
    <div>
      <Radio checked/>
    </div>

    <br/>
    <div>
      <Checkbox checked/>
    </div>

    <br/>
    <div>
      <Switch checked/>
    </div>

    <br/>
    <div>
      <SearchInput/>
    </div>

    <br/>
    <div>
      <Select options={[{id: 1, value: '1', label: 'label'}]} inputProps={{placeholder: 'Choose tag'}}/>
    </div>
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
      props: {isConnected: true, listingsAndReviews: []},
    }
  } catch (e) {
    console.error(e)
    return {
      props: {isConnected: false},
    }
  }
}
