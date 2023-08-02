"use client";

import { useEffect} from "react"; 
import { createClient } from "@supabase/supabase-js"; // for supabase's function
import {  Auth } from "@supabase/auth-ui-react"; // for Auth UI
import {ThemeSupa} from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter,redirect } from "next/navigation";
import { Database } from "../../../../types/supabase";







  export default function AuthHelper() {
    const supabase = createClientComponentClient<Database>();
     
   

    return (
      <div className="auth">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme = "light"
        providers={["facebook", "linkedin"]}
        view="sign_in"
        showLinks={false}
        redirectTo="https://3000-tutuldot-jobhunter-sxusvamb6e5.ws-us102.gitpod.io/auth/callback"
      />
    </div>
    )
  };
