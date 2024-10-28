import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navigationbar() {
    return (
        <div className="absolute top-4 left-4 space-x-4">
            <Link href="/home" passHref>
                <Button type="submit">Home</Button>
            </Link>
            <Link href="/newsfeed" passHref>
                <Button type="submit">Newsfeed</Button>
            </Link>
            <Link href="/account" passHref>
                <Button type="submit">Account</Button>
            </Link>
            <Link href="/friendslist" passHref>
                <Button type="submit">Friends List</Button>
            </Link>
            <Link href="/search-user" passHref>
                <Button type="submit">Search User</Button>
            </Link>
            <Link href="/direct_message" passHref>
                <Button type="submit">Direct Messages</Button>
            </Link>
            <Link href="/group_chat" passHref>
                <Button type="submit">Group Chats</Button>
            </Link>
        </div>
    );
}

export default Navigationbar;
