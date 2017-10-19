export const connectionString = process.env.DATABASE_URL || 'postgres://localhost/auth0tutorial';

export const googleConfig = {
  clientID: 'client-id',
  clientSecret: 'client-secret',
  callbackURL: 'http://localhost:3000/auth/google/callback'
};
