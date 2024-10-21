import { track as trackClient } from '@vercel/analytics';
import { track as trackServer } from '@vercel/analytics/server';
import { USER_ACTIONS, LOCATION } from '@/constants';

interface UserActionDetails {
  location?: LOCATION | string,
  provider?: string
  url?: string
  value?: string
}

type AllowedPropertyValues = string | number | boolean | null;

export const logUserAction = (action: USER_ACTIONS, details?: UserActionDetails) => {
  // console.log(`Tracking action: ${action}`, details);
  trackClient(action, details as Record<string, AllowedPropertyValues>);
}

export const logUserActionServer = (action: USER_ACTIONS, details?: UserActionDetails) => {
  console.log(`Tracking user action: ${action}`, details);
  trackServer(action, details as Record<string, AllowedPropertyValues>);
}
