/*jshint browser:true jquery:true*/
/*global alert*/
define([
    'jquery',
    'mage/utils/wrapper',
    'mage/apply/main'
], function ($, wrapper, mage) {
    'use strict';

    return function(targetModule){

        var updatePrice = targetModule.prototype._UpdatePrice;
        targetModule.prototype.dynamic = {};
        targetModule.prototype.dynamicAttrs = [];

        $('[data-dynamic]').each(function(){
            var code = $(this).data('dynamic');
            var value = $(this).html();
            var attrs = [];

            // Get the initial attributes value to be able to reset them if a user selects an option and then selects none again
            $.each(this.attributes, function() {
                attrs[this.name] = this.value;
            });

            targetModule.prototype.dynamic[code] = value;
            targetModule.prototype.dynamicAttrs[code] = attrs;
        });

        var updatePriceWrapper = wrapper.wrap(updatePrice, function(original){
            var dynamic = this.options.jsonConfig.dynamic;
            console.log(dynamic);
            for (var code in dynamic){
                if (dynamic.hasOwnProperty(code)) {
                    var value = "";
                    var attrs = [];
                    var $placeholder = $('[data-dynamic='+code+']');
                    var allSelected = true;

                    if(!$placeholder.length) {
                        continue;
                    }

                    for(var i = 0; i<this.options.jsonConfig.attributes.length;i++){
                        if (!$('div.product-info-main .product-options-wrapper .swatch-attribute.' + this.options.jsonConfig.attributes[i].code).attr('option-selected')){
                            allSelected = false;
                        }
                    }

                    if(allSelected){
                        var products = this._CalcProducts();
                        value = this.options.jsonConfig.dynamic[code][products.slice().shift()].value;
                        attrs = this.options.jsonConfig.dynamic[code][products.slice().shift()].attrs;
                    } else {
                        value = this.dynamic[code];
                        attrs = this.dynamicAttrs[code];
                    }

                    $placeholder.html(value);

                    // Set all attributes if we have some
                    if(attrs != undefined) {
                        for(var a in attrs) {
                            $placeholder.attr(a, attrs[a]);
                        }
                    }
                }
            }

            mage.apply();

            return original();
        });

        targetModule.prototype._UpdatePrice = updatePriceWrapper;
        return targetModule;
    };
});
