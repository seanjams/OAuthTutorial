export const connectionString = process.env.DATABASE_URL || 'postgres://localhost/auth0tutorial';

export const googleConfig = {
  clientID: '71042043336-1q1fhgjrj3b4k1inke8vo5u1gsqfq8vp.apps.googleusercontent.com',
  clientSecret: 'tnGu6VIAjKvaqBy1Yz5a47JU',
  callbackURL: 'http://localhost:8080/auth/google/callback'
};



// export const googleConfig = {
//   clientID: 'client-id-here',
//   clientSecret: 'client-secret-here',
//   callbackURL: 'http://localhost:8080/auth/google/callback'
// };
