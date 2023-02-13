<script>
    import { auth, db } from "$lib/firebase";
    import {
        GoogleAuthProvider,
        onAuthStateChanged,
        signInWithPopup,
    } from "firebase/auth";
    import { onMount } from "svelte";

    let user;

    onMount(() => {
        onAuthStateChanged(auth, (_user) => {
            user = _user;
        });
    });
</script>

{#if user === undefined}
    Loading
{:else if user === null}
    <button
        on:click={async () => {
            await signInWithPopup(auth, new GoogleAuthProvider());
        }}
    >
        Login with Google
    </button>
{:else}
    todo
{/if}
