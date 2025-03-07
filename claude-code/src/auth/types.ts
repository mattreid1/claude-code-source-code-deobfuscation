/**
 * Authentication Types
 * 
 * Type definitions for authentication functionality.
 */

/**
 * Authentication token structure
 */
export interface AuthToken {
  /**
   * Access token
   */
  accessToken: string;
  
  /**
   * Refresh token (optional)
   */
  refreshToken?: string;
  
  /**
   * Token expiration timestamp (Unix time in seconds)
   */
  expiresAt: number;
  
  /**
   * Token type (e.g., 'Bearer')
   */
  tokenType: string;
  
  /**
   * Token scope
   */
  scope: string;
  
  /**
   * Token ID (optional)
   */
  id?: string;
}

/**
 * Authentication methods
 */
export enum AuthMethod {
  /**
   * API key authentication
   */
  API_KEY = 'api_key',
  
  /**
   * OAuth authentication
   */
  OAUTH = 'oauth'
}

/**
 * Authentication states
 */
export type AuthState = 
  | 'initial'
  | 'authenticating'
  | 'authenticated'
  | 'failed'
  | 'refreshing'
  | 'expired'
  | 'unauthenticated';

/**
 * Authentication state constants
 */
export const AuthState = {
  INITIAL: 'initial' as AuthState,
  AUTHENTICATING: 'authenticating' as AuthState,
  AUTHENTICATED: 'authenticated' as AuthState,
  FAILED: 'failed' as AuthState,
  REFRESHING: 'refreshing' as AuthState,
  EXPIRED: 'expired' as AuthState,
  UNAUTHENTICATED: 'unauthenticated' as AuthState
}

/**
 * Authentication result
 */
export interface AuthResult {
  /**
   * Whether authentication was successful
   */
  success: boolean;
  
  /**
   * Authentication method used
   */
  method?: AuthMethod;
  
  /**
   * Authentication token
   */
  token?: AuthToken;
  
  /**
   * Current authentication state
   */
  state: AuthState;
  
  /**
   * Error message if authentication failed
   */
  error?: string;
}

/**
 * Token storage interface
 */
export interface TokenStorage {
  /**
   * Save a token
   */
  saveToken(key: string, token: AuthToken): Promise<void>;
  
  /**
   * Get a token
   */
  getToken(key: string): Promise<AuthToken | null>;
  
  /**
   * Delete a token
   */
  deleteToken(key: string): Promise<void>;
  
  /**
   * Clear all tokens
   */
  clearTokens(): Promise<void>;
}

/**
 * OAuth configuration
 */
export interface OAuthConfig {
  /**
   * Client ID
   */
  clientId: string;
  
  /**
   * Client secret
   */
  clientSecret?: string;
  
  /**
   * Authorization endpoint
   */
  authorizationEndpoint: string;
  
  /**
   * Token endpoint
   */
  tokenEndpoint: string;
  
  /**
   * Redirect URI
   */
  redirectUri: string;
  
  /**
   * Requested scopes
   */
  scopes: string[];
  
  /**
   * Response type
   */
  responseType: string;
  
  /**
   * Whether to use PKCE
   */
  usePkce?: boolean;
}

/**
 * Authentication manager configuration
 */
export interface AuthConfig {
  apiKey?: string;
  oauth?: OAuthConfig;
  preferredMethod?: AuthMethod;
  autoRefresh?: boolean;
  tokenRefreshThreshold?: number;  // in seconds
  maxRetryAttempts?: number;
} 