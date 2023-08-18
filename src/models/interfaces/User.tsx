export interface Values {
    SMTP_SERVER?: string;
    SMTP_USERNAME?: string;
    SMTP_PASSWORD?: string;
    SMTP_PORT_TLS?: string;
    SMTP_PORT_SSL?: string;
  
  }

  export interface Config {
    id: number;
    user_id: string;
    values?: Values;
    modified_at: string;
  }




  export interface UserDetails {
    active?: boolean;
    code?: string;
    created_at?: string;
    email?: string;
    fullname?: string;
    id?: number;
    last_login?: string;
    status?: string;
    subscription?: string;
    user_id?: string;
   
  
  }