import { bigCommerceFetch } from 'lib/bigcommerce';
import { getStoreSettingsQuery } from 'lib/mybigcommerce/queries/storeSettings';

const extractStoreSettings = (responseData) => {
  const settings = responseData?.data?.site?.settings;

  return {
    storeName: settings?.storeName,
    logo: settings?.logoV2?.image
  };
};

export async function getStoreSettings() {
  const res = await bigCommerceFetch({
    query: getStoreSettingsQuery
  });

  return extractStoreSettings(res.body);
}
