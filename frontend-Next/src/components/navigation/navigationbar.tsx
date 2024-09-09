import * as React from "react"
import {Button} from "@/components/ui/button";
import Link from "next/link";

function Navigationbar() {
    return (
        <div className="absolute top-4 left-4">
            <Link href="/" passHref>
                <Button type="submit">Home</Button>
            </Link>
            <Link href="/news-feed" passHref>
                <Button type="submit">Newsfeed</Button>
            </Link>
        </div>
    );
}

export default Navigationbar;
