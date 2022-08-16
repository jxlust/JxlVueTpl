import { ref } from 'vue';

const myV = ref('test init');
const flag = false;

const btnClick = (ctx) => {
  console.log('click:', ctx);
  ctx.emit('mclick', 'click data');
};

//click props way1
const myClick1 = (msg: string, e: Event) => {
  console.log('msg:', msg);
  console.log('e:', e);
};
//click props way2
const myClick2 = (msg: string) => {
  return (e: Event) => {
    console.log('e: ', e);
    console.log('msg:', msg);
  };
};

//click props way3
const myClick3 = (e: Event, msg: string) => {
  console.log('msg:', msg, e);
};

type PropsType = {
  title: string;
};
const renderDom = (props: PropsType, ctx: any) => {
  const { title } = props;
  return (
    <div>
      <section>
        <span>props: {title}</span>
      </section>
      <section>
        <span v-show={flag}>function tsx!!!</span>
        {!flag ? <div>ok</div> : <div>no</div>}
      </section>

      <section>
        <button onClick={btnClick.bind(this, ctx)}>btnClick</button>
        <button onClick={myClick1.bind(this, 'msg way 1')}>myClick1</button>
        <button onClick={myClick2('msg way 2')}>myClick2</button>
        <button onClick={(e: Event) => myClick3(e, 'msg way 3')}>myClick3</button>
      </section>

      <section>
        <span>{myV.value}</span>
        <input type="text" v-model={myV.value} />
      </section>
    </div>
  );
};

export default renderDom;
