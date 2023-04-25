import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import Head from "next/head";

function NewMeetupPage(){
    const router = useRouter()
    async function addMeetupHandler(enteredData){
       const response = await fetch('/api/new-meetup',{
        method:'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(enteredData)
       })
       const data = await response.json()

       console.log(data);
       router.push('/')
    }

    return <>
    <Head>
        <title>Add new meetup</title>
        <meta name="description" content="add your own meetup" />
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </>
}

export default NewMeetupPage