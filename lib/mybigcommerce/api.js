import { bigCommerceFetch } from 'lib/bigcommerce';
import { getStoreSettingsQuery } from 'lib/mybigcommerce/queries/storeSettings';

const extractStoreSettings = (responseData) => {
  const settings = responseData?.data?.site?.settings;

  const logo = settings?.logoV2;

  return {
    storeName: settings?.storeName,
    logo: {
      url: logo['__typename'] == 'StoreImageLogo' ? logo?.image.url : null,
      text: logo['__typename'] == 'StoreImageLogo' ? settings?.storeName : logo?.text
    }
  };
};

export async function getStoreSettings() {
  const res = await bigCommerceFetch({
    query: getStoreSettingsQuery
  });

  return extractStoreSettings(res.body);
}
