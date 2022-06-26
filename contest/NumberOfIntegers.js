// count Non-Zero Digits
function countNonZeroDigits(n) {
    var cnt = 0;
    while (n > 0) {
      var r = n%10;
      if (r !=0) {
        cnt++;
      }
      n = (n-r) /10 ;
    }
    return cnt;
  }
  
  // string digits comparison
  function gt(a,b) {
    if (a==b) {
      return 0
    }
    if (a.length != b.length) {
      return a.length - b.length;
    }
    return a > b ? 1:-1;
  }
  
  //str.lstrip("0")
  function lstripZero(v){
    var found = false;
    var idx = 0;
    var len = v.length;
    while (!found && idx < len) {
      if (v.charAt(idx) == "0") {
        idx++;
        continue
      }
      found =true;
    }
    return v.toString().substring(idx,len)
  }
  ////////////////////////////////////
  /////////////////////////////////
  ///////////////////////////////////
  const MODULO = Math.pow(10, 9) + 7;
  const N =200;
  var C = new Array(N);
  var D = [].fill.call({ length: N }, 1);//new Array(N);
  var E = [].fill.call({ length: N }, 1);//new Array(N);
  
  function genCombMatx(N) {
    for(var i = 0; i< C.length; i++){
      C[i] = [].fill.call({ length: N }, 0);//new Array(N);
    };
  
    for (var i = 0; i < N; i++) {
        C[i][0] = 1;
    }
    for (var i = 1; i < N; i++) {
      for (var j = 1; j < N; j++){
        if (j>i) {
          continue;
        }
        C[i][j] = (C[i - 1][j] + C[i - 1][j - 1]) % MODULO;
      }
    }
  }
  
  // 9**i
  function genNineMatrix(N){
    for (var i = 1; i < N; i++) {
        D[i] = 9 * D[i-1] % MODULO;
    }
      for (var i = 1; i < N; i++) {
        E[i] = 10 * E[i-1] % MODULO;
    }
  }
          
  genCombMatx(N);
  genNineMatrix(N);
  
  // console.log(C);
  // console.log(D);
  // console.log(E);
  
  function minKdigits(K) {
    return parseInt("1".repeat(K),10);
  }
  
  function allNonDigits(K) {
    return D[K];//Math.pow(9, K);
  }
  
  
  // C(n,k) = n*(n-1) * ...(n-k+1)/k!
  function combination(n,k) {
    // exception
    if (k < 1 || k >= n) {
      return 1;
    }
    //
    var u = 1;
    var e = n-k+1;
    while (n>=e) {
      u*=n
      n--;
    }
    var d = 1;
    var i = d;
    while (i<=k) {
      d*=i
      i++;
    }  
    return u/d;
    
  }
  
  function multiplyBigInt(a,b) {
    var _a = BigInt(a);
    var _b = BigInt(b);
    return Number(_a * _b % BigInt(MODULO));
  }
  //
  // K: the number of non-zero digits
  // P: the number of zero digits
  // K<=1 || P==0 ? D[K]:D[K] * C[K + P -1][K-1]
  function possibleKdigits(K,P) {
    var ret = (K<=1 || P==0) ? D[K]:multiplyBigInt(D[K],C[K + P -1][K-1]);
    // console.log(K,P,ret)
    return ret;
  }
  
  function allPossibleKdigits(K,P) {
    // console.log(K,P)
    var ret = 0;
    if (P < 0 || K < 0) {
      return ret;
    }
    else if (K == 0) {
      return 1;
    }
    else if (P == 0) {
      return D[K];
    }
  
    for (var i=0;i<=P;i++) {
      // console.log(i,possibleKdigits(K,i)%MODULO);
      ret+=possibleKdigits(K,i);
      ret = ret % MODULO;
      // console.log(ret)
    }
    return ret;
  }
  
  // K: the number of non-zero digits
  // N: upper limit
  // tc: 55 -> 41(4*9+5)
  function allPossibleKdigitsLt(K,N) {
  
    
    var ret = 0;
    N = lstripZero(N);
    var A = N.length;
    // console.log(K,N,A);
    if (K == 0) {
      return 1;
    } else if (A < K || !N) {
      return 0;
    } else if (A==K) {
      var cnt = 0;
      for (var i=0;i<K;i++){
        var r = parseInt(N.charAt(i));
        if (K > 1 && i<K-1) {
          r--;
        }
        if (r<=0) {
          break;
        }
        ret += r*D[K-1-i];
      }
      if (K==1) {
        ret++
      }
      return ret;
    }
    A--;
    var c = D[A];
    var l = parseInt(N.charAt(0));
    var n = N.substring(1,A+1);
    // console.log(c,l,n);
    ret = allPossibleKdigits(K,A-K);
    // console.log(K,A-K,ret);
    ret += (l-1)*allPossibleKdigits(K-1,A-K+1);
    // console.log(K-1,A-K+1,ret);
    ret += allPossibleKdigitsLt(K-1,n);
    // console.log(K-1,n,ret);
    return ret;
  }
  // 1: L~K
  // 2: K~lg(R)
  // 3: lg(R) ~ R
  function getNumberOfIntegers(L, R, K) {
    //
    L = lstripZero(L);
    R = lstripZero(R);
    // Write your code here
    var ans = 0;
    //
    var Lk = "1".repeat(K);
    var Lx = gt(L,Lk)>0 ? L:Lk;
    if (gt(Lx,R) >= 0) {
      return ans;
    }
    if (L == Lk) {
      ans--;
    } else if (gt(L,Lk)>0) {
      ans = -allPossibleKdigitsLt(K,L)
    }
    console.log(ans);
    //
    ans+=allPossibleKdigitsLt(K,R)
    // console.log(ans);
    return ans % MODULO;
  }
  
  var tcs = [
          ["1",
           "100",
           2,
           81],
           
          ["1",
           "100",
           1,
           18],
  
          ["11",
           "55",
           2,
           40],
  
          ["2323",
           "770201",
           6,
           393660],
  
          ["2323",
           "70201",
           5,
           39366],
           
          ["3",
           "3033",
           2,
           309],
  
          ["3",
           "403033",
           3,
           10029],
          
          ["627853907469124521429977",
          "953022761509988465931022569949020271394528905327031814530438328331476302434659734585465578374658",
          94,
          796829182,
          ],
          
          [
           "205051024583175884438122919882421672097087114679",
          "4927079049281772010790345404318018631663796774698011174883521488658580999819655443255733238",
          14,
          425936352,
              ],
              
          ];
  
  // var tc = tcs[8];
  // var L = tc[0];
  // var R = tc[1];
  // var K = tc[2];
  // var T = tc[3];
  
  // console.log("getNumberOfIntegers:",getNumberOfIntegers(L,R,K));
  // console.log(allPossibleKdigits(14,47-14))
  for (var i =0; i < tcs.length; i++) {
    var tc = tcs[i];
    var L = tc[0];
    var R = tc[1];
    var K = tc[2];
    var T = tc[3];  
    console.log(i,"getNumberOfIntegers:",getNumberOfIntegers(L,R,K));
  }
  