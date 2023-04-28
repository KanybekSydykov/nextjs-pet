import { MongoClient,ObjectId } from "mongodb";

import MeetUpDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <><Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
    </Head>
      <MeetUpDetail
       image={props.meetupData.image}
       title = {props.meetupData.title}
       address={props.meetupData.address}
       description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  // fetch id/path from DB
  const client = await MongoClient.connect(
    "mongodb+srv://limuskana:JwKQztCkIt9uGQ2J@cluster0.vezltem.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close()
  return {
    fallback: blocking,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://limuskana:JwKQztCkIt9uGQ2J@cluster0.vezltem.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)})

  client.close()
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        address: selectedMeetup.address
      }
    },
  };
}

export default MeetupDetails;
