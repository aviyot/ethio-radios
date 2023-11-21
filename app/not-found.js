import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <h2> Requested User is unavailable </h2>

      <Link href="/"> Go back Home </Link>
    </>
  );
}
