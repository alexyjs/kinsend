// import clientPromise from '../lib/mongodb'
import {Button} from '../components/primitives/Button'
import {Input, SearchInput} from '../components/primitives/Input'
import {Select} from '../components/primitives/Select'
import {Checkbox} from '../components/primitives/Checkbox'
import {Radio} from '../components/primitives/Radio'
import {Switch} from '../components/primitives/Switch'
import * as React from "react";

import {Typography} from '../components/primitives/Typography'
import {Dialog, DialogTitle, DialogActions, DialogContent} from '../components/primitives/Dialog'

import {
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import useNotification from "../infrastructure/hooks/useNotification";

export default function Home({isConnected, listingsAndReviews}) {
  const [showModal, setShowModal] = React.useState(false)
  const { notifySuccess, notifyError, notifyWarning } = useNotification();

  return (<>
    <div>
      <Button variant="outlined" color="primary" onClick={() => setShowModal(true)}>
        Show Modal
      </Button>
      <br />
      <Button variant="outlined" color="primary" onClick={() => notifySuccess("Success")}>
        Show Success
      </Button>
      <br />
      <Button variant="outlined" color="primary" onClick={() => notifyError("Error")}>
        Show Error
      </Button>
      <br />
      <Button variant="outlined" color="primary" onClick={() => notifyWarning("Warning")}>
        Show Warning
      </Button>

      <Dialog onClose={() => setShowModal(false)} aria-labelledby="customized-dialog-title" open={showModal}>
        <DialogTitle id="customized-dialog-title" onClose={() => setShowModal(false)}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setShowModal(false)} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
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
