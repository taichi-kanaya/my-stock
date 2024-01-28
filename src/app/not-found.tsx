import Link from "next/link";

export default function NotFound() {
  return (
    <div className="m-10 text-center">
      <h1>ページが存在しません</h1>
      <div className="my-5">
        <Link
          className="my-10 rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-600"
          href="/"
        >
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
