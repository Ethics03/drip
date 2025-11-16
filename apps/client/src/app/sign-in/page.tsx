import { AuthPage } from "@/components/auth-page";
import { requireUnAuth } from "@/lib/auth-utils";

export default async function Page() {
    await requireUnAuth();
    return <AuthPage />;
}
