import { mount } from '@vue/test-utils';

import FormWrapper from '@/components/FormWrapper.vue';
import DivisorsForm from '@/components/DivisorsForm.vue';

describe('children rendering', () => {
  const submitFunction = jest.fn();

  it('should render children id correctly', () => {
    const wrapper = mount(FormWrapper, {
      slots: {
        DivisorsForm,
      },
      props: { id: 'divisors-form', onSubmit: submitFunction },
    });

    expect(wrapper.find('#divisors-form').exists()).toBe(true);
  });

  it('should pass down submit method prop correctly', () => {
    const wrapper = mount(FormWrapper, {
      slots: {
        DivisorsForm,
      },
      props: { id: 'divisors-form', onSubmit: submitFunction },
    });

    wrapper.find('#divisors-form').trigger('submit');

    expect(submitFunction).toHaveBeenCalled();
  });
});
