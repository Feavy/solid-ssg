import { For, Suspense } from "solid-js/web";

const Profile = (props: any) => (
  <>
    <h1>{props.user?.firstName}'s Profile</h1>
    <p>This section could be about you.</p>
    <Suspense fallback={<span class="loader">Loading Info...</span>}>
      <ul>
        <For each={props.info}>{(fact: any) => <li>{fact}</li>}</For>
      </ul>
    </Suspense>
  </>
);

export default Profile;
