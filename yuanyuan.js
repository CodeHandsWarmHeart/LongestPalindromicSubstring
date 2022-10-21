function longestPalSubstr(str)
{
     let inputLen = str.length;

     /*创建一个二维表格  a  b  b  a
       T代表true     a  T
                     b     T
                     b        T
                     a           T
     */
     let table = new Array(inputLen);
     for(let i = 0; i < inputLen; i++)
     {
         table[i] = new Array(inputLen);
     }
     let maxLength = 1;
     for (let i = 0; i < n; ++i)
         table[i][i] = true;

     /* 特定情况 当回文字符串长度为 2.
     下面一段的效果是    a  b  b  b  a
       T代表true     a  T
                     b     T  T  T
                     a        T  T
                     b           T
                     a              T
     */
     let start = 0;
     for (let i = 0; i < n - 1; ++i)
     {
         if (str[i] == str[i + 1])
         {
             table[i][i + 1] = true;
             start = i;
             maxLength = 2;
         }
     }

     //当回文字符串长度大于 2.
     for (let PalindromicSubstrLen = 3;
              PalindromicSubstrLen <= n;
              ++PalindromicSubstrLen) {

         for (let substrStartIndex = 0;
                  substrStartIndex < n - PalindromicSubstrLen  + 1;
                  ++substrStartIndex)
         {
             let substrEndIndex = substrStartIndex + PalindromicSubstrLen - 1;

             /*具体解释一下 下面的if statement的第一条 table[substrStartIndex + 1][substrEndIndex - 1]
             使用table数据结构的目的就是减少运算的次数， 注意我们是从回文长度 1， 2， 3 递增检索的
             所以 例如当我们检索回文长度为 n 的所有可能时 我们可以利用之前检索的回文长度为 n-2 的结果
                       就是说我们确定 abba 中“bb”是符合条件的回文  来根据已经运算过的结果 快速排查新目标字符串
                       之后再看 新加的头尾两个字母是否相同，即abba 中 头尾'a' 和末尾'a'是否相同
                       =========注意======== table数据结构中
                 index  0 1 2 3 4           出现T 就代表以此字母为结尾的字符串中 有符合回文标准的字符串
                        b a c a b  举个例子 当检索回文长度=3的所有可能时
                  0  b  T            请注意更短的 回文长度=1，2 的结果在table中已经记录
                  1  a    T          ====重要==== 实现不重复运算
                  2  c      T        代码体现为 例如检索 bac时 其index为 0，1，2, startIndex= 0, endIndex=2
                  3  a        T      我们会先看 table[startIndex+1][endIndex-1]  对应table[1][1]返回true
                  4  b          T（因为测试回文长度=3 中间字母肯定符合回文条件, table[startIndex+1][endIndex-1]此时保持在对角线上）
                           即所谓的 bac掐头去尾的剩余字符串是回文， 之后我们再判断两头两个字母是否一致
                          只有当掐头去尾子字符串是回文 且头尾字母一致 比如检索“aca”时 startIndex=1, endIndex=3
                          因为table[startIndex+1][endIndex-1] 即table[2][2]=true 且str[1] = str[3]
                          所以 ‘aca’为回文  并将table[1][3] 赋值 True
              检索完所有 回文字符串长度=3 的可能后 运算结果如下
                index   0 1 2 3 4
                        b a c a b
                   0 b  T            同理当回文长度递增到检索 回文长度=4 时
                   1 a    T   T      我们先来看baca (index 起止为 0， 3)
                   2 c      T        第一步 检索比baca掐头去尾后所剩的字符串是否是回文
                   3 a        T      代码体现为 table[0+1][3-1] 是否为True 并不是
                   4 b          T        所以因为baca 的掐头去尾的子字符串ac不是回文 导致baca不可能是回文
                （所有类似情景 就是运用数据结构 减少了运算次数，且if 的and statement中先查table的值 后比较头尾字符也优化了运算速度）
                                     多举个例子 在检索 acab时 startIndex= 1, endIndex=4
                                            table[startIndex+1][endIndex-1] 即 table[2][3] = false
                                            acab 的掐头去尾的子字符串ca不是回文 所以acab一定不是回文
                  举个成功的例子 上面的table 也是运算完所有 回文长度=4 的结果
                   再接着检索 回文长度=5 时 例如在排查 bacab 时， startIndex= 0, endIndex=4
                    第一步 检查 去掉末尾一个字母后的剩余字符串是否存在回文
                           代码中就是查询 table[0+1][4-1] = true
                    第二步 判定 str[0] == str[4]
             */
             if (table[substrStartIndex + 1][substrEndIndex - 1]
                 && str[substrStartIndex] == str[substrEndIndex]) {
                 table[substrStartIndex][substrEndIndex] = true;

                 if (PalindromicSubstrLen > maxLength) {
                     start = substrStartIndex;
                     maxLength = PalindromicSubstrLen;
                 }
             }
         }
     }
     document.write("Longest palindrome substring is; ");
     printSubStr(str, start, start + maxLength - 1);

}
