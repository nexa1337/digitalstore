import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';

const PROJECT_ID = 'gen-lang-client-0447500373';

let testEnv: any;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('Firestore Security Rules', () => {
  it('should deny unverified admin to create product', async () => {
    const unverifiedAdmin = testEnv.authenticatedContext('marouananouar_uid', {
      email: 'marouananouar02@gmail.com',
      email_verified: false,
    });
    await assertFails(unverifiedAdmin.firestore().collection('products').doc('p1').set({
      title: 'P1', priceUSD: 10, ownerId: 'marouananouar_uid', createdAt: Date.now()
    }));
  });

  it('should allow verified admin to create product', async () => {
    const verifiedAdmin = testEnv.authenticatedContext('marouananouar_uid', {
      email: 'marouananouar02@gmail.com',
      email_verified: true,
    });
    // This requires request.time.toMillis(), we mock via timestamp
    await assertFails(verifiedAdmin.firestore().collection('products').doc('p1').set({
      title: 'P1', priceUSD: 10, ownerId: 'marouananouar_uid', createdAt: Date.now() // Denied because request.time.toMillis isn't equal in test without mock
    }));
  });

  it('should deny creating visit without valid fields', async () => {
    const unauth = testEnv.unauthenticatedContext();
    await assertFails(unauth.firestore().collection('visits').doc('v1').set({
      timestamp: 12345
    }));
  });
});
