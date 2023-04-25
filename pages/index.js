import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

function HomePage(props) {
  return (
    <>
    <Head>
      <title>React Meetups</title>
      <meta name="description" content="Browse a huge list of highly active React Meetups"/>
    </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   // fetch data
//   //This code runs only on the Server
//   return {
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps(){
  //fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://limuskana:JwKQztCkIt9uGQ2J@cluster0.vezltem.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups')
  
  const meetups = await meetupsCollection.find().toArray()
  client.close()
  return {
    props:{
      meetups: meetups.map(meetup => (
        {
          title:meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString()
        }
      ))
    },
    // check for the props update with a given time in ms
    revalidate: 10
  }
}

export default HomePage;
