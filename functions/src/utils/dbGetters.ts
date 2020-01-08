import { Organization } from "../reminder/reminderUtils";
import { db } from "./initFirebase";

export const getOrganization = async (
  orgId: string
): Promise<Organization | undefined> => {
  const doc = await db
    .collection("organizations")
    .doc(orgId)
    .get();

  if (doc.exists) {
    const privateOrgDocs = await db
      .collection("organizationsPrivateData")
      .where("organizationId", "==", orgId)
      .limit(1)
      .get();

    const privateOrgDoc = privateOrgDocs.docs.pop();

    if (!privateOrgDoc) {
      return undefined;
    }

    return {
      id: doc.id,
      ...doc.data(),
      privateData: {
        id: privateOrgDoc.id,
        ...privateOrgDoc.data()
      }
    } as Organization;
  }
  return undefined;
};
