import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/styles/home.styles';
import { BalanceCard } from '../../components/BalanceCard';
import NoTransactionFound from '../../components/NoTransactionFound';
import PageLoader from '../../components/PageLoader';
import { SignOutButton } from '../../components/SignOutButton';
import { TransactionItem } from '../../components/TransactionItem';
import { useTransactions } from '../../hooks/useTransactions';


export default function Page() {

  const { user } = useUser();
  const router=useRouter();
  const [refreshing , setRefreshing]=useState(false);

  const { transactions, summary, isLoading, loadData, deleteTransactions } = useTransactions(user.id);

const onRefresh = async ()=>{
  setRefreshing(true);
  await loadData()
  setRefreshing(false)
}

  useEffect(() => {
    loadData();
  }, [loadData]);



const handleDelete=(id)=>{
  Alert.alert("Delete Transaction" ,"Are you sure you want to delete this transaction?",[
    {text:"Cancel",style:"cancel"},
    {text:"Delete",style:"destructive", onPress:()=>deleteTransactions(id)},
  ]);
};

  if(isLoading && !refreshing) return <PageLoader/>

  return (
   <View style={styles.container}>
    <View style={styles.content}>
      {/*HEADER */}
      <View style={styles.header}>
        {/*LEFT */}
        <View style={styles.headerLeft}>
          <Image
          source={require("../../assets/images/logo2.png")}
          style={styles.headerLogo}
          resizeMode='contain'
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome.</Text>
            <Text style={styles.usernameText}>
              {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
            </Text>

          </View>

        </View>
{/*=====================RIGHT============================ */}
<View style={styles.headerRight}>
  <TouchableOpacity style={styles.addButton} onPress={()=> router.push("/create")}>
<Ionicons name="add" size={20} color='#fff' />
<Text style={styles.addButtonText}>Add</Text>
  </TouchableOpacity>
<SignOutButton/>
</View>

      </View>
<BalanceCard summary={summary} />
<View style={styles.transactionsContainer}>
  <Text style={styles.sectionTitle}>Recent Transactions</Text>

</View>
    </View>
<FlatList style={styles.transactionsList}
contentContainerStyle={styles.transactionsListContent}
data={transactions}
renderItem={({item})=>
  <TransactionItem item={item} onDelete={handleDelete} />}
ListEmptyComponent={<NoTransactionFound/>}
showsVerticalScrollIndicator={false}
refreshControl={<RefreshControl refreshing={refreshing} 
onRefresh={onRefresh}
/>}
/>
   </View>
  );
}