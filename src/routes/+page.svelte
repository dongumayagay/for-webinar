<script>
    import { auth, db } from "$lib/firebase";
    import {
        GoogleAuthProvider,
        onAuthStateChanged,
        signInWithPopup,
        signOut,
    } from "firebase/auth";
    import {
        addDoc,
        collection,
        deleteDoc,
        doc,
        onSnapshot,
        query,
        updateDoc,
        where,
    } from "firebase/firestore";
    import { onMount } from "svelte";

    const todo_collection = collection(db, "todos");

    let user;
    let todo_text = "";
    let list_of_todos = [];

    onMount(() => {
        onAuthStateChanged(auth, (_user) => {
            user = _user;
            if (user) {
                const user_todos_query = query(
                    todo_collection,
                    where("owner", "==", user.uid)
                );
                onSnapshot(user_todos_query, (querySnapshot) => {
                    list_of_todos = querySnapshot.docs.map((item) => ({
                        id: item.id,
                        ...item.data(),
                    }));
                });
            }
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
    <button
        on:click={async () => {
            await signOut(auth);
        }}>logout</button
    >
    <br />
    <input type="text" placeholder="todo text" bind:value={todo_text} />
    <button
        on:click={async () => {
            await addDoc(todo_collection, { owner: user.uid, todo_text });
            todo_text = "";
        }}
    >
        add todo
    </button>

    <ul>
        {#each list_of_todos as todo_item}
            <li>
                <input type="text" bind:value={todo_item.todo_text} />
                <button
                    on:click={async () => {
                        await updateDoc(doc(db, "todos", todo_item.id), {
                            todo_text: todo_item.todo_text,
                        });
                        alert("todo updated");
                    }}>update</button
                >
                <button
                    on:click={async () => {
                        await deleteDoc(doc(db, "todos", todo_item.id));
                    }}
                >
                    delete
                </button>
            </li>
        {/each}
    </ul>
{/if}
