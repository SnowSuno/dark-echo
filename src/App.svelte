<script lang="ts">
  import P5 from "p5-svelte";
  import { sketch } from "~/game";

  // import { ImmutableVector  } from "~/utils/vector";
  // import { vector } from "~/utils/vector.js";

  // const vec = vector(1, 2);
  // const vec2 = vec.add(new ImmutableVector(3, 4));
  //
  // // console.log(vec.add(vec2));
  // console.log(vec);
  // console.log(vec2);
  // console.log(vec2.add(vec2));
  // console.log(vec2);
</script>

<P5 {sketch}/>
