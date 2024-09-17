import { Subscription } from 'rxjs';

export function unsubscribe(
  subscriptions: Subscription | Subscription[] | null
): void {
  if (Array.isArray(subscriptions)) {
    subscriptions.forEach((sub) => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
        console.log('Unsubscribed successfully.');
      }
    });
  } else if (subscriptions && !subscriptions.closed) {
    subscriptions.unsubscribe();
    console.log('Unsubscribed successfully.');
  } else {
    console.log('No active subscription to unsubscribe.');
  }
}
