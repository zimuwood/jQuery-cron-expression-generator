(function ($) {
    // Cron 插件封装
    $.fn.cronGenerator = function (options) {
        var settings = $.extend({
            title: 'Cron表达式生成器',
            description: '可视化配置秒、分、时、日、月、周，生成对应的Cron表达式',
            defaultExpression: '* * * * * ?'
        }, options);

        return this.each(function () {
            var $container = $(this);
            var componentId = 'cron-gen-' + Math.random().toString(36).substr(2, 9);
            // 创建组件HTML结构
            $container.addClass('cron-generator-component').html(`
                <div class="cron-header">
                    <h2>${settings.title}</h2>
                    <p>${settings.description}</p>
                </div>
            
                <div class="cron-fields">
                    <!-- 秒 -->
                    <div class="cron-field">
                        <label>秒 (0-59)</label>
                        <div class="cron-options">
                            <select class="field-type" data-field="second">
                                <option value="all">每一秒</option>
                                <option value="specific">特定值</option>
                                <option value="interval">间隔</option>
                                <option value="range">范围</option>
                                <option value="list">列表</option>
                            </select>
                        </div>
                        <div class="advanced-options" data-field="second">
                            <div class="option specific-option">
                                <input type="number" min="0" max="59" placeholder="输入秒值" value="0">
                            </div>
                            <div class="option interval-option">
                                <div class="option-row">
                                    <input type="number" min="0" max="59" value="0" placeholder="起始">
                                    <span>/</span>
                                    <input type="number" min="1" max="59" value="1" placeholder="步长">
                                </div>
                            </div>
                            <div class="option range-option">
                                <div class="option-row">
                                    <input type="number" min="0" max="59" placeholder="开始" value="0">
                                    <span>-</span>
                                    <input type="number" min="0" max="59" placeholder="结束" value="59">
                                </div>
                            </div>
                            <div class="option list-option">
                                <input type="text" placeholder="用逗号分隔，如: 1,3,5">
                            </div>
                        </div>
                        <button type="button" class="toggle-advanced" data-field="second">
                            高级设置
                        </button>
                    </div>
                
                    <!-- 分 -->
                    <div class="cron-field">
                        <label>分 (0-59)</label>
                        <div class="cron-options">
                            <select class="field-type" data-field="minute">
                                <option value="all">每一分</option>
                                <option value="specific">特定值</option>
                                <option value="interval">间隔</option>
                                <option value="range">范围</option>
                                <option value="list">列表</option>
                            </select>
                        </div>
                        <div class="advanced-options" data-field="minute">
                            <div class="option specific-option">
                                <input type="number" min="0" max="59" placeholder="输入分值" value="0">
                            </div>
                            <div class="option interval-option">
                                <div class="option-row">
                                    <input type="number" min="0" max="59" value="0" placeholder="起始">
                                    <span>/</span>
                                    <input type="number" min="1" max="59" value="1" placeholder="步长">
                                </div>
                            </div>
                            <div class="option range-option">
                                <div class="option-row">
                                    <input type="number" min="0" max="59" placeholder="开始" value="0">
                                    <span>-</span>
                                    <input type="number" min="0" max="59" placeholder="结束" value="59">
                                </div>
                            </div>
                            <div class="option list-option">
                                <input type="text" placeholder="用逗号分隔，如: 1,3,5">
                            </div>
                        </div>
                        <button type="button" class="toggle-advanced" data-field="minute">
                            高级设置
                        </button>
                    </div>
                
                    <!-- 时 -->
                    <div class="cron-field">
                        <label>时 (0-23)</label>
                        <div class="cron-options">
                            <select class="field-type" data-field="hour">
                                <option value="all">每一小时</option>
                                <option value="specific">特定值</option>
                                <option value="interval">间隔</option>
                                <option value="range">范围</option>
                                <option value="list">列表</option>
                            </select>
                        </div>
                        <div class="advanced-options" data-field="hour">
                            <div class="option specific-option">
                                <input type="number" min="0" max="23" placeholder="输入时值" value="0">
                            </div>
                            <div class="option interval-option">
                                <div class="option-row">
                                    <input type="number" min="0" max="23" value="0" placeholder="起始">
                                    <span>/</span>
                                    <input type="number" min="1" max="23" value="1" placeholder="步长">
                                </div>
                            </div>
                            <div class="option range-option">
                                <div class="option-row">
                                    <input type="number" min="0" max="23" placeholder="开始" value="0">
                                    <span>-</span>
                                    <input type="number" min="0" max="23" placeholder="结束" value="23">
                                </div>
                            </div>
                            <div class="option list-option">
                                <input type="text" placeholder="用逗号分隔，如: 1,3,5">
                            </div>
                        </div>
                        <button type="button" class="toggle-advanced" data-field="hour">
                            高级设置
                        </button>
                    </div>
                
                    <!-- 日 -->
                    <div class="cron-field">
                        <label>日 (1-31)</label>
                        <div class="cron-options">
                            <select class="field-type" data-field="day">
                                <option value="all">每一天</option>
                                <option value="specific">特定值</option>
                                <option value="interval">间隔</option>
                                <option value="range">范围</option>
                                <option value="list">列表</option>
                                <option value="last">最后一天</option>
                            </select>
                        </div>
                        <div class="advanced-options" data-field="day">
                            <div class="option specific-option">
                                <input type="number" min="1" max="31" placeholder="输入日值" value="1">
                            </div>
                            <div class="option interval-option">
                                <div class="option-row">
                                    <input type="number" min="1" max="31" value="1" placeholder="起始">
                                    <span>/</span>
                                    <input type="number" min="1" max="30" value="1" placeholder="步长">
                                </div>
                            </div>
                            <div class="option range-option">
                                <div class="option-row">
                                    <input type="number" min="1" max="31" placeholder="开始" value="1">
                                    <span>-</span>
                                    <input type="number" min="1" max="31" placeholder="结束" value="30">
                                </div>
                            </div>
                            <div class="option list-option">
                                <input type="text" placeholder="用逗号分隔，如: 1,3,5">
                            </div>
                        </div>
                        <button type="button" class="toggle-advanced" data-field="day">
                            高级设置
                        </button>
                    </div>
                
                    <!-- 月 -->
                    <div class="cron-field">
                        <label>月 (1-12)</label>
                        <div class="cron-options">
                            <select class="field-type" data-field="month">
                                <option value="all">每一月</option>
                                <option value="specific">特定值</option>
                                <option value="interval">间隔</option>
                                <option value="range">范围</option>
                                <option value="list">列表</option>
                            </select>
                        </div>
                        <div class="advanced-options" data-field="month">
                            <div class="option specific-option">
                                <input type="number" min="1" max="12" placeholder="输入月值" value="1">
                            </div>
                            <div class="option interval-option">
                                <div class="option-row">
                                    <input type="number" min="1" max="12" value="1" placeholder="起始" >
                                    <span>/</span>
                                    <input type="number" min="1" max="11" value="1" placeholder="步长" >
                                </div>
                            </div>
                            <div class="option range-option">
                                <div class="option-row">
                                    <input type="number" min="1" max="12" placeholder="开始" value="1" >
                                    <span>-</span>
                                    <input type="number" min="1" max="12" placeholder="结束" value="12" >
                                </div>
                            </div>
                            <div class="option list-option">
                                <input type="text" placeholder="用逗号分隔，如: 1,3,5" >
                            </div>
                        </div>
                        <button type="button" class="toggle-advanced" data-field="month">
                            高级设置
                        </button>
                    </div>
                
                    <!-- 周 -->
                    <div class="cron-field">
                        <label>周 (0-6, 0=周日)</label>
                        <div class="cron-options">
                            <select class="field-type" data-field="week">
                                <option value="all">每一周</option>
                                <option value="specific">特定值</option>
                                <option value="interval">间隔</option>
                                <option value="range">范围</option>
                                <option value="list">列表</option>
                                <option value="weekday">工作日</option>
                                <option value="weekend">周末</option>
                            </select>
                        </div>
                        <div class="advanced-options" data-field="week">
                            <div class="option specific-option">
                                <input type="number" min="0" max="6" placeholder="输入周值" value="0">
                            </div>
                            <div class="option interval-option">
                                <div class="option-row">
                                    <input type="number" min="0" max="6" value="0" placeholder="起始">
                                    <span>/</span>
                                    <input type="number" min="1" max="6" value="1" placeholder="步长">
                                </div>
                            </div>
                            <div class="option range-option">
                                <div class="option-row">
                                    <input type="number" min="0" max="6" placeholder="开始" value="0">
                                    <span>-</span>
                                    <input type="number" min="0" max="6" placeholder="结束" value="6">
                                </div>
                            </div>
                            <div class="option list-option">
                                <input type="text" placeholder="用逗号分隔，如: 1,3,5">
                            </div>
                        
                            <div class="weekdays">
                                <div class="weekday">
                                    <input type="checkbox" id="${componentId}-week-0" value="0">
                                    <label for="${componentId}-week-0">周日</label>
                                </div>
                                <div class="weekday">
                                    <input type="checkbox" id="${componentId}-week-1" value="1">
                                    <label for="${componentId}-week-1">周一</label>
                                </div>
                                <div class="weekday">
                                    <input type="checkbox" id="${componentId}-week-2" value="2">
                                    <label for="${componentId}-week-2">周二</label>
                                </div>
                                <div class="weekday">
                                    <input type="checkbox" id="${componentId}-week-3" value="3">
                                    <label for="${componentId}-week-3">周三</label>
                                </div>
                                <div class="weekday">
                                    <input type="checkbox" id="${componentId}-week-4" value="4">
                                    <label for="${componentId}-week-4">周四</label>
                                </div>
                                <div class="weekday">
                                    <input type="checkbox" id="${componentId}-week-5" value="5">
                                    <label for="${componentId}-week-5">周五</label>
                                </div>
                                <div class="weekday">
                                    <input type="checkbox" id="${componentId}-week-6" value="6">
                                    <label for="${componentId}-week-6">周六</label>
                                </div>
                                <small class="help-text">勾选将自动生成列表格式</small>
                            </div>
                
                        </div>
                        <button type="button" class="toggle-advanced" data-field="week">
                            高级设置
                        </button>
                    </div>
                </div>
            
                <div class="cron-result">
                    <label>Cron表达式</label>
                    <input type="text" id="cron-expression" readonly value="${settings.defaultExpression}">
                </div>
            
                <div class="cron-description">
                    <h4>表达式说明</h4>
                    <p id="cron-description-text">任务默认配置</p>
                </div>
            
                <div class="button-group">
                    <button type="button" class="btn btn-primary generate-btn">生成Cron表达式</button>
                    <button type="button" class="btn btn-reset reset-btn">重置</button>
                </div>
            `);

            // 初始化字段和状态
            function initFields() {
                // 隐藏所有高级选项，隐藏周复选框
                $container.find('.advanced-options').removeClass('active');
                $container.find('.option').hide();
                $container.find('.weekdays').hide();
                // 初始化表达式
                if (settings.defaultExpression) {
                    initWithExpression(settings.defaultExpression);
                }
            }

            // 展开/收起高级选项
            function toggleAdvanced(field) {
                var $advanced = $container.find(`.advanced-options[data-field="${field}"]`);
                $advanced.toggleClass('active');
                // 更新按钮文本
                var $btn = $container.find(`.toggle-advanced[data-field="${field}"]`);
                $btn.html($advanced.hasClass('active') ? '收起' : '高级设置');
            }

            // 处理字段变化
            function handleFieldChange(field) {
                var type = $container.find(`.field-type[data-field="${field}"]`).val();
                // 隐藏当前字段所有选项
                $container.find(`.advanced-options[data-field="${field}"] .option`).hide();

                // 周字段特殊处理
                if (field === 'week') {
                    if (type === 'list') {
                        $container.find('.weekdays').show();
                    } else {
                        $container.find('.weekdays').hide();
                    }
                }

                // 显示当前类型对应选项
                if (['all', 'last', 'weekday', 'weekend'].indexOf(type) === -1) {
                    $container.find(`.advanced-options[data-field="${field}"] .${type}-option`).show();
                }

                generateCron();
            }

            // 处理周复选框变化
            function handleWeekdayChange() {
                var checkedValues = [];
                $container.find('.weekday input:checked').each(function () {
                    checkedValues.push($(this).val());
                });

                if (checkedValues.length > 0) {
                    $container.find('.field-type[data-field="week"]').val('list');
                    $container.find('.advanced-options[data-field="week"] .list-option input').val(checkedValues.join(','));
                    generateCron();
                }
                if (checkedValues.length === 0) {
                    $container.find('.advanced-options[data-field="week"] .list-option input').val('');
                }
            }

            // 生成 Cron 表达式
            function generateCron() {
                var fields = ['second', 'minute', 'hour', 'day', 'month', 'week'];
                var cronParts = [];
                var descriptions = [];

                fields.forEach(function (field) {
                    var type = $container.find(`.field-type[data-field="${field}"]`).val();
                    var part = '', desc = '';

                    switch (field) {
                        case 'second':
                        case 'minute':
                            part = getFieldValue(field, type, 0, 59);
                            desc = getFieldDescription(type, field === 'second' ? '秒' : '分', part);
                            break;
                        case 'hour':
                            part = getFieldValue(field, type, 0, 23);
                            desc = getFieldDescription(type, '时', part);
                            break;
                        case 'day':
                            part = getFieldValue(field, type, 1, 31);
                            desc = getFieldDescription(type, '日', part);
                            break;
                        case 'month':
                            part = getFieldValue(field, type, 1, 12);
                            desc = getFieldDescription(type, '月', part);
                            break;
                        case 'week':
                            part = getFieldValue(field, type, 0, 6);
                            desc = getWeekDescription(type, part);
                            break;
                    }
                    cronParts.push(part);
                    if (desc) descriptions.push(desc);
                });

                // 日和周冲突处理
                if (cronParts[3] !== '*' && cronParts[5] !== '*') cronParts[5] = '?';

                var expression = cronParts.join(' ');
                $container.find('#cron-expression').val(expression);

                var fullDesc = descriptions.length > 0 ? descriptions.join('，') + '执行' : '每秒执行一次';
                $container.find('#cron-description-text').text(fullDesc);
            }

            // 重置表单
            function resetForm() {
                $('.field-type').val('all');
                $('.advanced-options').removeClass('active');
                $('.toggle-advanced').html('<i class="fas fa-cog"></i> 高级设置');
                $('.advanced-options input').val('');
                $('.weekday input').prop('checked', false);
                $('.advanced-options .option').hide();

                // 恢复默认表达式
                initWithExpression(settings.defaultExpression);
            }

            // 获取字段值
            function getFieldValue(field, type, min, max) {
                switch (type) {
                    case 'all': return '*';
                    case 'specific':
                        var val = $container.find(`.advanced-options[data-field="${field}"] .specific-option input`).val();
                        return isValidValue(val, min, max) ? val : '*';
                    case 'interval':
                        var start = $container.find(`.advanced-options[data-field="${field}"] .interval-option input:first`).val();
                        var step = $container.find(`.advanced-options[data-field="${field}"] .interval-option input:last`).val();
                        return isValidValue(start, min, max) && isValidValue(step, 1, max - min) ? `${start}/${step}` : '*';
                    case 'range':
                        var from = $container.find(`.advanced-options[data-field="${field}"] .range-option input:first`).val();
                        var to = $container.find(`.advanced-options[data-field="${field}"] .range-option input:last`).val();
                        return isValidValue(from, min, max) && isValidValue(to, min, max) && parseInt(from) <= parseInt(to) ? `${from}-${to}` : '*';
                    case 'list':
                        var list = $container.find(`.advanced-options[data-field="${field}"] .list-option input`).val();
                        if (list) {
                            var items = list.split(',').map(i => i.trim());
                            var valids = items.filter(i => isValidValue(i, min, max));
                            if (valids.length > 0) return valids.join(',');
                        }
                        return '*';
                    case 'last': return 'L';
                    case 'weekday': return '1-5';
                    case 'weekend': return '0,6';
                    default: return '*';
                }
            }

            function isValidValue(val, min, max) {
                if (!val) return false;
                var n = parseInt(val);
                return !isNaN(n) && n >= min && n <= max;
            }

            function getFieldDescription(type, unit, value) {
                switch (type) {
                    case 'all': return `每${unit}`;
                    case 'specific': return `${value}${unit}`;
                    case 'interval': return `从${value.split('/')[0]}${unit}开始，每${value.split('/')[1]}${unit}`;
                    case 'range': return `${value}${unit}`;
                    case 'list': return `${value}${unit}`;
                    case 'last': return '每月最后一天';
                    default: return '';
                }
            }

            function getWeekDescription(type, value) {
                switch (type) {
                    case 'all': return '每周';
                    case 'specific': return `每周${getWeekdayName(parseInt(value))}`;
                    case 'interval': return `从每周${getWeekdayName(parseInt(value.split('/')[0]))}开始，每${value.split('/')[1]}天`;
                    case 'range': return `每周${getWeekdayName(parseInt(value.split('-')[0]))}至${getWeekdayName(parseInt(value.split('-')[1]))}`;
                    case 'list':
                        return `每周${value.split(',').map(v => getWeekdayName(parseInt(v))).join('、')}`;
                    case 'weekday': return '每周一至周五';
                    case 'weekend': return '每周六、周日';
                    default: return '';
                }
            }

            function getWeekdayName(d) { return ['日', '一', '二', '三', '四', '五', '六'][d] + '(' + d + ')'; }

            function initWithExpression(expr) {
                if (!expr) return;
                var parts = expr.split(' ');
                if (parts.length !== 6) return;
                var fields = ['second', 'minute', 'hour', 'day', 'month', 'week'];
                const fieldConfigs = {
                    second: { min: 0, max: 59 },
                    minute: { min: 0, max: 59 },
                    hour: { min: 0, max: 23 },
                    day: { min: 1, max: 31 },
                    month: { min: 1, max: 12 },
                    week: { min: 0, max: 6 }
                };

                fields.forEach((field, index) => {
                    const value = parts[index];
                    const config = fieldConfigs[field];

                    if (value === '*') {
                        $(`.field-type[data-field="${field}"]`).val('all');
                    }
                    else if (value === 'L' && field === 'day') {
                        $(`.field-type[data-field="${field}"]`).val('last');
                    }
                    else if (value === '1-5' && field === 'week') {
                        $(`.field-type[data-field="${field}"]`).val('weekday');
                    }
                    else if (value === '0,6' && field === 'week') {
                        $(`.field-type[data-field="${field}"]`).val('weekend');
                    }
                    else if (value.includes('/')) {
                        const [start, step] = value.split('/');
                        $(`.field-type[data-field="${field}"]`).val('interval');
                        $(`.advanced-options[data-field="${field}"] .interval-option input:first`).val(start);
                        $(`.advanced-options[data-field="${field}"] .interval-option input:last`).val(step);
                        $(`.advanced-options[data-field="${field}"]`).addClass('active');
                    }
                    else if (value.includes('-')) {
                        const [from, to] = value.split('-');
                        $(`.field-type[data-field="${field}"]`).val('range');
                        $(`.advanced-options[data-field="${field}"] .range-option input:first`).val(from);
                        $(`.advanced-options[data-field="${field}"] .range-option input:last`).val(to);
                        $(`.advanced-options[data-field="${field}"]`).addClass('active');
                    }
                    else if (value.includes(',')) {
                        $(`.field-type[data-field="${field}"]`).val('list');
                        $(`.advanced-options[data-field="${field}"] .list-option input`).val(value);
                        $(`.advanced-options[data-field="${field}"]`).addClass('active');

                        if (field === 'week') {
                            const weekdays = value.split(',');
                            weekdays.forEach(day => {
                                $container.find(`#${componentId}-week-${day}`).prop('checked', true);
                            });
                        }
                    }
                    else if (!isNaN(parseInt(value)) && parseInt(value) >= config.min && parseInt(value) <= config.max) {
                        $(`.field-type[data-field="${field}"]`).val('specific');
                        $(`.advanced-options[data-field="${field}"] .specific-option input`).val(value);
                        $(`.advanced-options[data-field="${field}"]`).addClass('active');
                    }

                    handleFieldChange(field);
                });
                $container.find('#cron-expression').val(expr);
                generateCron();
            }

            // ==============================
            // 事件绑定
            // ==============================
            $container.on('click', '.toggle-advanced', function () {
                var field = $(this).data('field');
                toggleAdvanced(field);
            });

            $container.on('change', '.field-type', function () {
                var field = $(this).data('field');
                handleFieldChange(field);
            });

            $container.on('input', '.weekday input', function () {
                handleWeekdayChange();
            });

            // 生成 Cron 表达式按钮
            $container.on('click', '.generate-btn', function () {
                generateCron(); // 插件内部函数
            });

            // 重置按钮
            $container.on('click', '.reset-btn', function () {
                resetForm();    // 插件内部函数
            });

            initFields();

            // ==============================
            // 对外方法
            // ==============================
            $container.data('cronGenerator', {
                getCron: function () { return $container.find('#cron-expression').val(); },
                getDescription: function () { return $container.find('#cron-description-text').text(); },
                generate: generateCron
            });
        });
    };

    // jQuery 直接扩展方法，方便调用
    $.fn.getCron = function () {
        var inst = this.first().data('cronGenerator');
        return inst ? inst.getCron() : null;
    };

    $.fn.getCronDescription = function () {
        var inst = this.first().data('cronGenerator');
        return inst ? inst.getDescription() : null;
    };

    // 重置到默认表达式
    $.fn.resetCron = function () {
        var inst = this.first().data('cronGenerator');
        if (inst && inst.reset) inst.reset();
        return this;
    };

})(jQuery);
