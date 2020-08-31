/**
 * Created by thomas on 2017-01-30.
 */

var config = {
    config: {
        mixins: {
            'Magento_ConfigurableProduct/js/configurable': {
                'Andering_ConfigurableDynamic/js/model/skuswitch': true
            },
			'Magento_Swatches/js/swatch-renderer': {
                'Andering_ConfigurableDynamic/js/model/swatch-skuswitch': true
            }
        }
    }
};
