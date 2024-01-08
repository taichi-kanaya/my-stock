import { redirect } from "next/navigation";

// トップページは一覧ページにする
const page = () => {
    redirect(`/stocks`);
};

export default page;