"use client";

import { useEffect} from "react"; 
import { createClient } from "@supabase/supabase-js"; // for supabase's function
import {  Auth } from "@supabase/auth-ui-react"; // for Auth UI
import {ThemeSupa} from "@supabase/auth-ui-shared";
import { useRouter,redirect } from "next/navigation";







  export default function AuthHelper() {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ); 
     
    const router = useRouter();
    supabase.auth.onAuthStateChange((event) => {
      console.log("status: " + event)
      if (event == "SIGNED_IN") {
        router.replace("/")
      }
      console.log("status: " + event)
    });

    return (
      <div className="auth">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme = "light"
        providers={["facebook", "linkedin"]}
        view="sign_in"
      />
    </div>
    )
  };
